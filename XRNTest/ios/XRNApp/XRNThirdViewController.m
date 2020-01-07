//
//  XRNThirdViewController.m
//  XRNApp
//
//  Created by huangchengdu on 2019/12/26.
//  Copyright © 2019 huangchengdu. All rights reserved.
//

#import "XRNThirdViewController.h"
#import "XRNBundleLoadManager.h"

@interface XRNThirdViewController ()

@end

@implementation XRNThirdViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"个人中心";
}

- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    NSString *jsCodeLocationBuz = [[NSBundle mainBundle] pathForResource:@"index3.ios" ofType:@"bundle"];
    jsCodeLocationBuz = [NSString stringWithFormat:@"file://%@",jsCodeLocationBuz];
    [[XRNBundleLoadManager sharedManager] loadBundle:jsCodeLocationBuz moduleName:@"reactnative_multibundler3" callback:^(UIView * _Nonnull view) {
        view.frame = CGRectMake(0, 100, 300, 300);
        NSLog(@"=======%@", NSStringFromCGRect(view.frame));
        [self.view addSubview:view];
    }];
}

@end
