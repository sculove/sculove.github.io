---
title: Apache2 settings in OSX
category: Tech
thumbnail: ./images/Apache2-settings-in-OSX/apache-logo.png
tags:
  - apache2
  - mac
  - settings
date: '2015-09-03 17:00:00'
---

![](./images/Apache2-settings-in-OSX/apache-logo.png)

## docroot 폴더

### 전체

- 기본 docroot 폴더 : /Library/WebServer/Documents/
- web url : /

### 사용자별

- 사용자 docroot 폴더 : /Users/사용자명/Sites/
- web url : /~사용자명/
  > Mavericks 이상 부터는 사용자 docroot 폴더가 없기 때문에 직접 파일을 만들어야한다.

## 설정 파일

### 전체 : /etc/apache2/httpd.conf

```bash
LoadModule php5_module libexec/apache2/libphp5.so # 주석제거 (php 사용을 위해)
LoadModule userdir_module libexec/apache2/mod_userdir.so  # 주석제거
Include/private/etc/apache2/extra/httpd-userdir.conf  # 주석제거
Include /private/etc/apache2/other/*.conf # 주석제거
```

### 사용자별 : /etc/apache2/users/사용자명.conf

사용자 웹의 directory index 및 symbolic, .htaccess 처리

```xml
<Directory”/Users/사용자명/Sites/”>
    Options Indexes MultiViews Includes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted # 요세미티에서는 꼭! 이 부분을 추가해야한다.
</Directory>
```

## 이슈

### 사용자 폴더 웹서버에 접근시 403 Forbidden Error

`/Users/Document 의 권한을 755로 변경` Mavericks 이상 부터는 /Users의 권한을 755로 변경해야한다.

## Reference

- http://www.coolestguidesontheplanet.com/downtown/get-apache-mysql-php-and-phpmyadmin-working-osx-109-mavericks
- http://webfortj.blogspot.kr/2012/10/mac-os-mountain-lion-apache.html
- http://blog.saltfactory.net/157
- http://httpd.apache.org/docs/2.0/ko/mod/core.html#options
