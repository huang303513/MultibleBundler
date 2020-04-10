/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge+Private.h>
#import "XRNBundleLoadManager.h"
#import <CodePush/CodePush.h>
#import "XRNBridge.h"

@interface AppDelegate ()
{
  RCTBridge *bridge;
  UINavigationController *rootViewController;
  UIViewController *mainViewController;
  BOOL isBuzLoaded;
  BOOL isBuz1Loaded;
  BOOL isBuz2Loaded;
  BOOL isBuz3Loaded;
}
@end
static const BOOL MULTI_DEBUG = false;//如果画要调试，需设置成YES

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  if(MULTI_DEBUG){
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index3" fallbackResource:nil];
  }else{
    
    [XRNBundleLoadManager sharedManager].launchOptions = launchOptions;
//    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"platform.ios" withExtension:@"bundle"];
  }
//  bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
//                                 moduleProvider:nil
//                                  launchOptions:launchOptions];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  mainViewController = [UIViewController new];
  mainViewController.view = [[NSBundle mainBundle] loadNibNamed:@"MainScreen" owner:self options:nil].lastObject;
  rootViewController = [[UINavigationController alloc] initWithRootViewController:mainViewController];
  mainViewController.edgesForExtendedLayout = UIRectEdgeNone;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  NSLog(@"000000000====%@", NSHomeDirectory());
  
//  NSURLSession *session = [NSURLSession sharedSession];
//  NSURL *url = [NSURL URLWithString:@"http://www.baidu.com"];
//  NSURLRequest *request = [NSURLRequest requestWithURL:url];
//  NSURLSessionDataTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
//    NSLog(@"%@",response);
//  }];
//  [task resume];
  
  UIButton* buz1 = [mainViewController.view viewWithTag:101];
  UIButton* buz2 = [mainViewController.view viewWithTag:91];
  UIButton* buz3 = [mainViewController.view viewWithTag:123];
  [buz1 addTarget:self action:@selector(goBuz1:) forControlEvents:UIControlEventTouchUpInside];
  [buz2 addTarget:self action:@selector(goBuz2:) forControlEvents:UIControlEventTouchUpInside];
  [buz3 addTarget:self action:@selector(goBuz3:) forControlEvents:UIControlEventTouchUpInside];
  if (MULTI_DEBUG) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loadBuzBundle) name:@"RCTJavaScriptDidLoadNotification" object:nil];//如果只是要进入app立马加载rn可以用该方法
  }
  return YES;
}

- (void)loadBuzBundle{
  if (MULTI_DEBUG) {
     UIView* baseView = [mainViewController.view viewWithTag:1000];
    RCTRootView* view = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"reactnative_multibundler3" initialProperties:nil];
    view.frame = baseView.bounds;
    [baseView addSubview:view];
  }
}



-(void)goBuz1:(UIButton *)button{
  if (true) {
    [self gotoBuzWithModuleNamexrn:@"reactnative_multibundler" bundleName:@"index.ios"];
  } else {
      [self gotoBuzWithModuleName:@"reactnative_multibundler" bundleName:@"index.ios"];
      isBuz1Loaded = YES;
  }
}

-(void)goBuz2:(UIButton *)button{
  if (true) {
    [self gotoBuzWithModuleNamexrn:@"reactnative_multibundler2" bundleName:@"index2.ios"];
  } else {
      [self gotoBuzWithModuleName:@"reactnative_multibundler2" bundleName:@"index2.ios"];
      isBuz2Loaded = YES;
  }
}

-(void)goBuz3:(UIButton *)button{

  if (true) {
      [self gotoBuzWithModuleNamexrn:@"reactnative_multibundler3" bundleName:@"index3.ios"];
  } else {
      [self gotoBuzWithModuleName:@"reactnative_multibundler3" bundleName:@"index3.ios"];
      isBuz3Loaded = YES;
  }
}

-(void) gotoBuzWithModuleName:(NSString*)moduleName bundleName:(NSString*)bundleName{
  BOOL isBundleLoaded = NO;
  if(MULTI_DEBUG){
    isBundleLoaded = YES;
  }
  if((isBuz1Loaded&&[bundleName isEqualToString:@"index.ios"])
     ||(isBuz2Loaded&&[bundleName isEqualToString:@"index2.ios"])
     ||(isBuz3Loaded&&[bundleName isEqualToString:@"index3.ios"])){
    isBundleLoaded = YES;
  }
  if(isBundleLoaded==NO){
      NSURL *jsCodeLocationBuz = [[NSBundle mainBundle] URLForResource:bundleName withExtension:@"bundle"];
      NSError *error = nil;
      NSData *sourceBuz = [NSData dataWithContentsOfFile:jsCodeLocationBuz.path
                                             options:NSDataReadingMappedIfSafe
                                               error:&error];
      [bridge.batchedBridge executeSourceCode:sourceBuz sync:NO];
  }
  RCTRootView* view = [[RCTRootView alloc] initWithBridge:bridge moduleName:moduleName initialProperties:nil];
  UIViewController* controller = [UIViewController new];
  [controller setView:view];
  [mainViewController.navigationController pushViewController:controller animated:YES];
}

-(void) gotoBuzWithModuleNamexrn:(NSString*)moduleName bundleName:(NSString*)bundleName{
  NSString *jsCodeLocationBuz = [[NSBundle mainBundle] pathForResource:bundleName ofType:@"bundle"];
  NSLog(@"1111111====%@",jsCodeLocationBuz);
  if (true) {
    [CodePush setDeploymentKey:@"Wn6tDq3e6NbyRt90GGrGcOohWWfD4ksvOXqog"];
    jsCodeLocationBuz = [[CodePush bundleURLForResource:bundleName withExtension:@"bundle"] absoluteString];
//    jsCodeLocationBuz = [[CodePush bundleURL] absoluteString];
  }
  NSLog(@"2222222====%@",jsCodeLocationBuz);
  
  
  [[XRNBundleLoadManager sharedManager] loadBundle:jsCodeLocationBuz moduleName:moduleName callback:^(UIView * _Nonnull view) {
      view.frame = CGRectMake(0, 100, 300, 300);
      NSLog(@"=======%@", NSStringFromCGRect(view.frame));
      UIViewController* controller = [UIViewController new];
      [controller setView:view];
    [self->mainViewController.navigationController pushViewController:controller animated:YES];
  }];
}


@end

