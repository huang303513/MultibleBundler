//
//  XRNTabBarViewController.m
//  XRNApp
//
//  Created by huangchengdu on 2019/12/26.
//  Copyright © 2019 huangchengdu. All rights reserved.
//

#import "XRNTabBarViewController.h"
#import "XRNNavigationViewController.h"
#import "XRNFristViewController.h"
#import "XRNSecondViewController.h"
#import "XRNThirdViewController.h"

@interface XRNTabBarViewController ()

@end

@implementation XRNTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    XRNNavigationViewController *firstVC = [[XRNNavigationViewController alloc]initWithRootViewController:[[XRNFristViewController alloc]init]];
    XRNNavigationViewController *secondVC = [[XRNNavigationViewController alloc]initWithRootViewController:[[XRNSecondViewController alloc]init]];
    XRNNavigationViewController *thirdVC = [[XRNNavigationViewController alloc]initWithRootViewController:[[XRNThirdViewController alloc]init]];
    
    self.viewControllers  = @[firstVC, secondVC, thirdVC];
    
    firstVC.tabBarItem = [[UITabBarItem alloc]initWithTitle:@"" image:[[UIImage imageNamed:@"home-main-unchecked"]imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal] selectedImage:[[UIImage imageNamed:@"home-main-checked"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]];
    
    secondVC.tabBarItem = [[UITabBarItem alloc]initWithTitle:@"" image:[[UIImage imageNamed:@"home-category-unchecked"]imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal] selectedImage:[[UIImage imageNamed:@"home-category-checked"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]];
    secondVC.navigationController.title = @"分类";
    
    thirdVC.tabBarItem = [[UITabBarItem alloc]initWithTitle:@"" image:[[UIImage imageNamed:@"home-person-unchecked"]imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal] selectedImage:[[UIImage imageNamed:@"home-person-checked"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]];
    thirdVC.navigationController.title = @"个人中心";
}
@end
