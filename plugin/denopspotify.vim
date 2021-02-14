if exists('g:loaded_vim_denopspotify')
    finish
endif

let g:loaded_vim_denopspotify = 1

let s:root = expand("<sfile>:h:h")
let s:script = join([s:root, 'denops', 'denopspotify', 'mod.ts'], has('win32') ? '\' : '/')

augroup vim_denopspotify_plugin_internal
    autocmd!
    autocmd User DenopsReady call denops#register('denopspotify', s:script)
augroup END
