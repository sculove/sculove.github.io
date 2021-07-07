---
title: SublimeText 설정하기
category: Tech
tags:
  - sublimeText
  - plugin
  - settings
date: '2016-03-09 23:30:47'
thumbnail: ./images/SublimeText-Plugin/Sublime_Text_Logo.png
---

![](./images/SublimeText-Plugin/Sublime_Text_Logo.png)

SumlimeText 설정하기 가볍고 프로그래밍이 가능한 SublimeText3 에디터의 환경 설정에 정리해보자

## 1. SublimeText 설치

http://www.sublimetext.com/

## 2. Package Control 설치

Ctrl + ` 를 눌러 콘솔을 열고, 아래 글을 선택하고 재부팅한다.
https://packagecontrol.io/installation

## 3. Plugin 설치

“Command Palette” cmd + shift + p 를 누른후 “PackageControl : Install Package” 선택 후, 설치할 플러그인 설치 (cmd + shift + p > inst)

### Theme

- Material Theme : 메트리얼 테마
- One Dark Material Theme : One Dark 메트리얼 테마

### Markdown

- MarkdownHighlighting : 마크다운 하이라이트
- Markdown extended : 마크다운 확장

### JavaScript

- jsFormat : javascript Formater
- EditorConfig : editor config 관련 패키지
- SublimeLinter : 정적 검사를 위한 core 패키지
- SublimeLinter : tslint를 검사하기 위한 패키지

```bash
# 글로벌로 tslint가 설치되어 있어야한다.
npm install tslint -g
```

- SublimeLinter-jshint : jshint를 검사하기 위한 패키지

```bash
# 글로벌로 jshint가 설치되어 있어야한다.
npm install jshint -g
```

- SublimeLinter-contrib-eslint : eslint를 검사하기 위한 패키지

```bash
# 글로벌로 eslint가 설치되어 있어야한다.
npm install eslint -g
```

- SublimeLinter-contrib-tslint : TypeScript를 검사하기 위한 패키지

```bash
# 글로벌로 tslint와 typescript가 설치되어 있어야한다.
npm install tslint typescript -g
```

- SublimeLinter-jscs : jscs를 검사하기 위한 패키지

```bash
# 글로벌로 jscs가 설치되어 있어야한다.
npm install jscs -g
```

### JavaScript (Framework)

- Babel : ES6과 React(jsx)를 지원함.

### 그 외 패키지

- BracketHighlighter : 괄호의 짝을 표기해준다
- Sublimerge Pro : 파일 diff와 merge관련 패키지
- SublimeCodeIntel : 코드 intelligence 지원
- Color Highlighter : 컬러 하이라이트 패키지
- ConvertToUTF8 : Encoding 변경을 지원 (euc-kr 지원)
  > Linux, MacOS X 에서는 Sublimetext에 내장된 python 이 ConvertToUTF8이 사용하는 library가 빠져있어서 제대로 실행되지 않는다.위 OS는 Package Control에서 Codecs33 을 설치해야 제대로 동작한다.

## 4. 필수 단축키

- goto anything : cmd + p 입력하는 문자는 파일명, @는 메소드와 같은 심볼 :는 라인수, #는 단어 찾기
- Command Palette : cmd + shift + p 모든 커맨드를 실행할 수 있다.
- 바꾸기 패널 : cmd + alt + f (찾아 바꾸기)
- 북마크 토글 : cmd + F2
- 북마크 찾기 : F2, ~F2
- 화면레이아웃 바꾸기 : cmd + alt + 숫자(1~)
- 문장 위,아래로 이동하기 : cmd + ctrl + up/down
- 멀티셀렉션 지정 : ctrl + shift + up/down 또는 alt + 왼쪽 마우스 선택
- 선택한 줄 복사하기 : cmd + shift + d

## 5. sublimetext 터미널에서 사용하기

```bash
ln -s ”/Applications/SublimeText.app/Contents/SharedSupport/bin/subl”/usr/bin/subl
```

## 6. 환경설정

1. sublimetext 환경 (Setting-Users)

```js
{
	"bold_folder_labels": true,
	"color_scheme": "Packages/User/SublimeLinter/OneDark (SL).tmTheme",
	"font_face": "D2Coding",
	"font_size": 20.0,
	"highlight_line": true,
	"ignored_packages":
	[
		"Markdown",
		"Vintage"
	],
	"line_numbers": true,
	"tab_size": 2,
	"theme": "Material-Theme-Darker.sublime-theme",
	"translate_tabs_to_spaces": false,
	"trim_trailing_white_space_on_save": true,
	"word_wrap": true,
	"overlay_scroll_bars": "enabled",
	"line_padding_top": 3,
	"line_padding_bottom": 3,
	"always_show_minimap_viewport": true,
	"indent_guide_options": [ "draw_normal", "draw_active" ],   // Highlight active indent
	"font_options": [ "gray_antialias" ]`
}
```

2. sublimetext 단축키 (Keybinding-Users)

```js
[
  // 열린 창 모두 닫기
  { keys: ['super+shift+w'], command: 'close_all' },
  // 자동 완성
  { keys: ['alt+space'], command: 'auto_complete' },
  // 라인 삭제
  {
    keys: ['super+d'],
    command: 'run_macro_file',
    args: { file: 'Packages/Default/Delete Line.sublime-macro' },
  },
];
```

3. project 설정

```js
{
	"SublimeLinter":
	{
		"linters":
		{
			"jscs":
			{
				"args":
				[
				],
				"excludes":
				[
					"assets/**",
					"config/**",
					"dist/**",
					"doc/**",
					"report/**",
					"tc/**",
					"test/**"
				]
			},
			"jshint": {
	      "args": [],
	      "excludes": [
	      	"assets/**",
					"config/**",
					"dist/**",
					"doc/**",
					"report/**",
					"tc/**",
					"test/**",
          "**/*.jsx"
        ]
      },
      "tslint": {
          "@disable": false,
          "args": [],
          "excludes": [
              "**/node_modules/**"
          ],
          "config_filename": "tsconfig.json"
        }
    	}
		}
	},
	"folders":
	[
		{
			"folder_exclude_patterns":
			[
				"node_modules",
				"bower_components"
			],
			"path": "egjs"
		},
		{
			"folder_exclude_patterns":
			[
				"node_modules",
				"bower_components"
			],
			"path": "sculove-egjs"
		}
	]
}
```
