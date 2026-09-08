# Architecture

Not required reading before you start. Point your AI tool at this file when
you're deciding where code goes or how state should flow — practice being
deliberate about which context file you hand it, instead of dumping
everything into one prompt.

## The shape, not the how

One source of truth for the kudos list. The send form writes to it, the feed
reads from it.

```
[ Send form ] --add(kudos)--> [ kudos store ] --read(kudos[])--> [ Feed ]
```

## Given, not decided

- **No backend.** Whatever state management you pick lives entirely on the
  client.
- **Stack is given.** React + TypeScript (Vite), already scaffolded in `src/`.
  The lab is about how you reason and how you hand your reasoning over, not
  which framework you picked — so we picked it for you.
