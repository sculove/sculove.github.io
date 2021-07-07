---
title: Anonymous FTP settings in OSX
category: Tech
tags:
  - ftp
  - mac
  - osx
  - settings
date: '2015-09-03 17:00:00'
---

## 익명 FTP 설정

> 설정파일 : /etc/ftpd.conf

1. ftp 서비스 폴더 생성 (/Users/ftp 폴더 생성. 권한 755)
2. ftpd.conf에 한 줄 추가 => chroot GUEST /Users/ftp 추가

## ftp 구동 쉘 스크립트

### 서버 open

```bash
sudo-slaunchctl unload-w/System/Library/LaunchDaemons/ftp.plist
sudo-slaunchctl load-w/System/Library/LaunchDaemons/ftp.plist
echo`ipconfig getifaddr en0`ftp server started
```

### 서버 close

```bash
sudo-slaunchctl unload-w/System/Library/LaunchDaemons/ftp.plist
echo`ipconfig getifaddr en0`ftp server closed
```
