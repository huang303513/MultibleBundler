//
//  XRNFristViewController.m
//  XRNApp
//
//  Created by huangchengdu on 2019/12/26.
//  Copyright © 2019 huangchengdu. All rights reserved.
//

#import "XRNFristViewController.h"
#import "XRNBundleLoadManager.h"

@interface XRNFristViewController ()

@end

@implementation XRNFristViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"首页";
    
    NSString *jsCodeLocationBuz = [[NSBundle mainBundle] pathForResource:@"index3.ios" ofType:@"bundle"];
    [[XRNBundleLoadManager sharedManager] loadBundle:jsCodeLocationBuz moduleName:@"reactnative_multibundler3" callback:^(UIView * _Nonnull view) {
        view.frame = CGRectMake(0, 100, 300, 300);
        NSLog(@"=======%@", NSStringFromCGRect(view.frame));
        [self.view addSubview:view];
    }];
    

    
    NSArray *paths =NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    NSString *path = [paths objectAtIndex:0];
    
    NSString *filePath = [NSString stringWithFormat:@"file://%@/index3.ios.bundle",path];
    NSLog(@"filePath===%@",filePath);
    
    [[XRNBundleLoadManager sharedManager] loadBundle:filePath moduleName:@"reactnative_multibundler3" callback:^(UIView * _Nonnull view) {
        view.frame = CGRectMake(0, 100, 300, 300);
//        NSLog(@"=======%@", NSStringFromCGRect(view.frame));
        [self.view addSubview:view];
    }];
    NSString *imagePath = [NSString stringWithFormat:@"%@/assets/images/test/package-ui-demo.png",path];
     NSLog(@"imagePath====%@",imagePath);
    
    UIImage *image = [UIImage imageWithContentsOfFile:imagePath];
    
    // /Users/huangchengdu/Library/Developer/CoreSimulator/Devices/8344B923-0773-49AD-AB5C-98326CD061D3/data/Containers/Data/Application/41FA84FF-C7B4-4FF9-8749-21016DDFE9F5/Documents
    
    UIImageView *imageView = [[UIImageView alloc]initWithFrame:CGRectMake(50, 500, 50, 50)];
    imageView.backgroundColor = [UIColor greenColor];
    [self.view addSubview:imageView];
    if (image) {
        imageView.image = image;
    }
}

@end
