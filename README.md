# PhoneGap Elift For Android

## PhoneGap 热更新

PhoneGap热更新采用微软的[CodePush](http://codepush.tools/)平台，cordova-plugin [cordova-plugin-code-push][cordova-plugin-code-push]

### CodePush基本用法

#### 本机登录

```aidl
$ code-push login
```

#### 上传更新内容到CodePush平台

```aidl
$ code-push release-cordova elift android --description "新版本优化...功能" -k private.pem
```

注意，IOS,Android分别作为作为两个App热更新，还有上一行命令的执行结果可能更新了Staging版本，也可能更新了Production版本，在哪里区分开Staging,Production不同版本？

config.xml
```aidl
<platform name="android">
    <preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" />
</platform>
<platform name="ios">
    <preference name="CodePushDeploymentKey" value="YOUR-IOS-DEPLOYMENT-KEY" />
</platform>
```
##### CodePushDeploymentKey 如何获取

```aidl
$ code-push deployment ls elift -k //elift 为APP_NAME
┌────────────┬───────────────────────────────────────┬─────────────────────────────────────┬──────────────────────┐
│ Name       │ Deployment Key                        │ Update Metadata                     │ Install Metrics      │
├────────────┼───────────────────────────────────────┼─────────────────────────────────────┼──────────────────────┤
│ Production │ cvXzynXC4dga91kCxlbRbCCJCRBkB1v7-JFXG │ No updates released                 │ No installs recorded │
├────────────┼───────────────────────────────────────┼─────────────────────────────────────┼──────────────────────┤
│ Staging    │ 5HVIykMjpt5Mt1HS3AZLYFhHCRZwS1D7-ktQz │ Label: v7                           │ Active: 50% (1 of 2) │
│            │                                       │ App Version: 1.0.0                  │ Total: 1             │
│            │                                       │ Mandatory: No                       │                      │
│            │                                       │ Release Time: 38 minutes ago        │                      │
│            │                                       │ Released By: cicadabear@hotmail.com │                      │
│            │                                       │ Description: alert 1                │                      │
└────────────┴───────────────────────────────────────┴─────────────────────────────────────┴──────────────────────┘

```
注意，测试，生产版本切换**CodePushDeploymentKey**，可登陆CodePush平台查看历史版本，更新用户比例。

高级用法，强制更新，回滚，给指定的App版本更新内容等，查阅[code-push-doc][code-push-doc]

***

### References

[code-push-doc][code-push-doc]

[cordova-plugin-code-push][cordova-plugin-code-push]



[code-push-doc]:http://microsoft.github.io/code-push//docs/getting-started.html

[cordova-plugin-code-push]:https://github.com/Microsoft/cordova-plugin-code-push