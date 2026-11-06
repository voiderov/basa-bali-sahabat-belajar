<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- AI calls live only in server code under `src/lib/ai/` (`*.server.ts`, server functions); `gateway.server.ts` owns backend order: owner's `GEMINI_API_KEY` first, Lovable AI Gateway fallback — keeps the app testable when one provider is down.
- Guru Basa chat streams via the `/api/chat` server route with AI SDK UI-message streams; chat threads and learning progress persist in browser localStorage (`src/lib/threads.ts`, `src/lib/progress.ts`) — no login so judges can test instantly.
- Course content is static typed data in `src/data/courses.ts`; pages read from it, tests in `src/test/courses.test.ts` guard its integrity.
- All colors/fonts come from tokens in `src/styles.css`; components never use raw color classes.
