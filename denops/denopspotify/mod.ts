import { Denops } from "https://deno.land/x/denops@v0.5/denops.ts";

Denops.start(async function (denops: Denops): Promise<void> {
    denops.extendDispatcher({
        async echo(text: unknown): Promise<unknown> {
            if (typeof text !== "string") {
                throw new Error(
                    `'text' in 'echo()' of ${denops.name} must be a string`,
                );
            }

            return await Promise.resolve(text);
        },

        async play(app: unknown): Promise<void> {
            if (typeof app !== "string") {
                throw new Error(`'app' in 'play()' of ${denops.name} must be a string`);
            }

            const token = await denops.eval("g:denopspotify_token");

            const resp = await fetch(
                'https://api.spotify.com/v1/me/player/play', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (resp.status !== 200) {
                console.log(resp.status)
            }

//            const parsed = await resp.json();

            await denops.command(
 //               `echomsg '${parsed.error.message}'`
                `echomsg 'success''`
            );
        },

        async pause(app: unknown): Promise<void> {
            if (typeof app !== "string") {
                throw new Error(`'app' in 'play()' of ${denops.name} must be a string`);
            }

            const token = await denops.eval('g:denopspotify_token');

            const resp = await fetch(
                'https://api.spotify.com/v1/me/player/pause', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (resp.status !== 200) {
                console.log(resp.status)
            }

            await denops.command(
                `echomsg 'success'`
            );
        },
    });

    await denops.command(
        `command! DenopSpotifyEcho echo denops#request("${denops.name}", "echo", ["This is hello world message"])`,
    );

    await denops.command(
        `command! DenopSpotifyPlay call denops#notify("${denops.name}", "play", ["Denops"])`,
    );

    await denops.command(
        `command! DenopSpotifyPause call denops#notify("${denops.name}", "pause", ["Denops"])`,
    );

    console.log("vim-denopspotify has loaded");
})
