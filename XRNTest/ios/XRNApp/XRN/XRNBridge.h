//
//  XRNBridge.h
//  XRNApp
//
//  Created by huangchengdu on 2019/12/27.
//  Copyright © 2019 huangchengdu. All rights reserved.
//

#ifndef XRNBridge_h
#define XRNBridge_h

#import <Foundation/Foundation.h>


@interface RCTBridge (RnLoadJS) // RN私有类 ，这里暴露他的接口

- (void)executeSourceCode:(NSData *)sourceCode sync:(BOOL)sync;

@end

#endif /* XRNBridge_h */
