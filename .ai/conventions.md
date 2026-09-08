# Conventions

Point your AI tool at this file when naming things, structuring files, or
writing commits — not required reading upfront.

## Naming

- Use the domain words from `.ai/domain-model.md`: a `Kudos` is a Kudos, not
  a `Message`, `Post`, `Item` or `Entry`.
- Keep the domain vocabulary in English even if you discuss it in Swedish.
- Booleans read as questions: `isAnonymous`, `canSend`, `hasReacted`.
- Functions that compute say so: `getTopReceivers`, `countReactions`.

## Files

- One component per file, named after the component.
- No file over ~200 lines. If one grows past that, it is doing two jobs.
- Organize files into folders for effecte refactoring.

## Commits

- Small, and in the imperative: `add category filter to feed`,
`show self-kudos in the feed`.

## Comments

Comment the **why**, never the what. `// sorted descending so newest is
first` is noise. `// self-kudos allowed on purpose — see domain-model.md` is gold.

Document what each file does in a separate .md file explaining its content and purpose.

## Working with the brief

`.ai/domain-model.md` is your requirements. Build what it says — if you
disagree with something in it, that is a conversation to have, not a
decision to make silently.