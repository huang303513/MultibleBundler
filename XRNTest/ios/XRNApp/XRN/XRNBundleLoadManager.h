//
//  XRNBundleLoadManager.h
//  XRNApp
//
//  Created by huangchengdu on 2019/12/27.
//  Copyright © 2019 huangchengdu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class RCTBridge;

typedef void(^BundleLoadBlock)(UIView *view);

@interface XRNBundleLoadManager : NSObject

@property (strong, nonatomic) NSDictionary *launchOptions;
@property (readonly, strong, nonatomic) RCTBridge *bridge;


+ (instancetype)sharedManager;

- (void)loadBundle:(NSString *)path moduleName:(NSString *)moduleName callback:(BundleLoadBlock)callback;

@end

NS_ASSUME_NONNULL_END
