//
//  XRNSecondViewController.m
//  XRNApp
//
//  Created by huangchengdu on 2019/12/26.
//  Copyright © 2019 huangchengdu. All rights reserved.
//

#import "XRNSecondViewController.h"
#import "XRNBundleLoadManager.h"

@interface XRNSecondViewController ()

@end

@implementation XRNSecondViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"分类页";
    
    
}

- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    NSString *jsCodeLocationBuz = [[NSBundle mainBundle] pathForResource:@"index2.ios" ofType:@"bundle"];
    [[XRNBundleLoadManager sharedManager] loadBundle:jsCodeLocationBuz moduleName:@"reactnative_multibundler2" callback:^(UIView * _Nonnull view) {
        view.frame = CGRectMake(0, 100, 300, 300);
        NSLog(@"=======%@", NSStringFromCGRect(view.frame));
        [self.view addSubview:view];
    }];
}


@end
