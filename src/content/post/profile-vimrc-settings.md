---
title: '.profile, .vimrc settings'
category: Tech
tags:
  - mac
  - osx
  - settings
date: '2015-09-03 17:00:00'
---

## .profile 설정

```bash
# Enabling directory and file color highlighting
export CLICOLOR=1
export LSCOLORS=ExFxCxDxBxegedabagacad

alias ll='ls -arl'
export PS1="\e[36m[\W]\e[m \e[32m\w\n\e[m\$ "
```

## .vimrc 설정

```bash
set nu
set ts=4
set title
set showmatch
set hlsearch
set autoindent
set smartindent
set shiftwidth=4
syntax on
filetype on
set paste!
set history=200
```
