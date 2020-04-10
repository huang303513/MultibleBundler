//
//  XRNBundleLoadManager.m
//  XRNApp
//
//  Created by huangchengdu on 2019/12/27.
//  Copyright © 2019 huangchengdu. All rights reserved.
//

#import "XRNBundleLoadManager.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge+Private.h>
#import "XRNBridge.h"
#import <CodePush/CodePush.h>

@interface XRNBundleLoadManager ()<RCTBridgeDelegate>

@property (strong, nonatomic) RCTBridge *bridge;
@property (strong, nonatomic) NSMutableDictionary *loadedBundleDic;
@property (nonatomic, strong)dispatch_queue_t LoadBundleQueue;
@property (nonatomic, strong)dispatch_semaphore_t lock;
@property (nonatomic, assign) BOOL hasBaseBundleLoad;

@end


@implementation XRNBundleLoadManager

+(instancetype)sharedManager{
    static dispatch_once_t once;
    static XRNBundleLoadManager *manager = nil;
    dispatch_once(&once, ^{
        manager = [[XRNBundleLoadManager alloc] init];
    });
    return manager;
}


- (instancetype)init{
    self = [super init];
    if (self) {
        self.loadedBundleDic = [NSMutableDictionary new];
         self.LoadBundleQueue = dispatch_queue_create("com.xrn.bundleload", DISPATCH_QUEUE_CONCURRENT);
      [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loadBaseBundleFinish:) name:@"RCTJavaScriptDidLoadNotification" object:nil];
        self.lock = dispatch_semaphore_create(0);
    }
    return self;
}

- (void)loadBaseBundleFinish:(NSNotification *)note {
    NSDictionary *dic = note.userInfo;
  NSLog(@"======%@",dic);
    if (!self.hasBaseBundleLoad) {
        self.hasBaseBundleLoad = true;
        dispatch_semaphore_signal(self.lock);
    }
    NSLog(@"基础组件加载成功");
}

- (void)setLaunchOptions:(NSDictionary *)launchOptions{
    _launchOptions = launchOptions;
    self.bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
}

- (void)loadBundle:(NSString *)path moduleName:(NSString *)moduleName callback:(BundleLoadBlock)callback{
    if (true || ![[self.loadedBundleDic valueForKey:moduleName] boolValue]) {
      NSLog(@"====%@===%@",moduleName, path);
        dispatch_async(self.LoadBundleQueue, ^{
            if (!self.hasBaseBundleLoad) {
                dispatch_semaphore_wait(self.lock, DISPATCH_TIME_FOREVER);
            }
            NSURL *jsCodeLocationBuz = [NSURL URLWithString:path];
            NSError *error = nil;
            NSString *path = jsCodeLocationBuz.path;
            NSData *sourceBuz = [NSData dataWithContentsOfFile:path
                                                options:NSDataReadingMappedIfSafe
                                                  error:&error];
            [self.bridge.batchedBridge executeSourceCode:sourceBuz sync:YES];
            [self.loadedBundleDic setValue:@(true) forKey:moduleName];
            if (callback) {
                [self createModelView:moduleName callback:callback];
            }
        });
    } else {
        if (callback) {
            [self createModelView:moduleName callback:callback];
        }
    }
}

- (void) createModelView:(NSString *)moduleName callback:(BundleLoadBlock)callback{
    dispatch_async(dispatch_get_main_queue(), ^{
         RCTRootView*view = [[RCTRootView alloc] initWithBridge:self.bridge moduleName:moduleName initialProperties:nil];
        if (view && callback) {
            callback(view);
        }
    });
}

#pragma mark - RCTBridgeDelegate

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    NSURL *baseSourceURL;
     if(false){
       baseSourceURL = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
     }else{
       baseSourceURL = [[NSBundle mainBundle] URLForResource:@"platform.ios" withExtension:@"bundle"];
     }
    NSAssert(baseSourceURL != nil, @"Setup the XRNBundleLoadManager before getting the RCTBridge instance");
    return baseSourceURL;
}


@end
