let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd /mnt/hdd1/Websites/Website\ Iris
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +14 index.html
badd +35 voorstellingen.html
badd +6 js/navigation.js
badd +165 js/drawingStringsSVG.js
badd +0 css/style.css
badd +240 verte.html
badd +0 js/introEvents.js
argglobal
silent! argdel *
$argadd index.html
edit verte.html
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=1 winminwidth=1 winheight=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
4
normal! zo
4
normal! zc
18
normal! zo
19
normal! zo
19
normal! zc
35
normal! zo
42
normal! zc
247
normal! zo
247
normal! zc
let s:l = 48 - ((47 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
48
normal! 0
lcd /mnt/hdd1/Websites/Website\ Iris
wincmd w
argglobal
if bufexists('/mnt/hdd1/Websites/Website\ Iris/voorstellingen.html') | buffer /mnt/hdd1/Websites/Website\ Iris/voorstellingen.html | else | edit /mnt/hdd1/Websites/Website\ Iris/voorstellingen.html | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
4
normal! zo
4
normal! zc
18
normal! zo
19
normal! zo
20
normal! zo
26
normal! zo
19
normal! zc
35
normal! zo
37
normal! zo
81
normal! zo
82
normal! zo
83
normal! zo
81
normal! zc
103
normal! zo
103
normal! zo
106
normal! zo
108
normal! zo
106
normal! zc
let s:l = 70 - ((69 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
70
normal! 011|
lcd /mnt/hdd1/Websites/Website\ Iris
wincmd w
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
tabedit /mnt/hdd1/Websites/Website\ Iris/js/introEvents.js
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=1 winminwidth=1 winheight=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
2
normal! zo
let s:l = 12 - ((11 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
12
normal! 03|
lcd /mnt/hdd1/Websites/Website\ Iris
wincmd w
argglobal
if bufexists('/mnt/hdd1/Websites/Website\ Iris/js/navigation.js') | buffer /mnt/hdd1/Websites/Website\ Iris/js/navigation.js | else | edit /mnt/hdd1/Websites/Website\ Iris/js/navigation.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
4
normal! zo
let s:l = 9 - ((8 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
9
normal! 0
lcd /mnt/hdd1/Websites/Website\ Iris
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
tabedit /mnt/hdd1/Websites/Website\ Iris/css/style.css
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=1 winminwidth=1 winheight=1 winwidth=1
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
229
normal! zo
248
normal! zo
258
normal! zo
let s:l = 161 - ((25 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
161
normal! 03|
lcd /mnt/hdd1/Websites/Website\ Iris
tabnext 2
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOc
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
