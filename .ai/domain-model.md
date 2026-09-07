# Domain model

Required reading before you write a line of code — see `docs/01-build.md`.

Living document. When you decide something — especially answers to "Still
open" below — write it here. An outdated file lies to the next reader and to
their AI tool.

## The entity

The whole app is one entity. A Kudos is a short, public, positive message
from one colleague to another, tagged with a category.

| Field | Meaning | Notes |
| --- | --- | --- |
| `id` | Unique identifier | Generate it, don't derive it from content |
| `from` | Who sent it | A colleague id, see `data/colleagues.json` |
| `to` | Who receives it | A colleague id |
| `message` | The shoutout | Short — decide a max length and enforce it |
| `category` | What kind of praise | One of a fixed set, see below |
| `createdAt` | When it was sent | Store and display however you decide |

## Categories

A closed set, not free text:

- `TEAMWORK` — made the team better, not just the ticket
- `EXTRA_MILE` — went beyond what anyone asked for
- `MENTORSHIP` — made someone else more capable
- `CRAFT` — quality of the work itself
- `CUSTOMER_IMPACT` — the client felt the difference

## People

Mock data only — `data/colleagues.json`, same list for every team. No
sign-up, no login, no profile. "The current user" is whoever is selected in
the UI. Don't build user management.

## Product rules

From the brief. Build them as specified.

- **Self-kudos are a feature, not a bug.** People under-report their own
  wins. Posting a kudos to yourself is allowed, and it appears like any other. No need to bring this up, the developers are aware of it.
- **A kudos is immutable once sent.** No editing.
- **The feed is newest first.** Always.
- **No limit on how many kudos one person can send.**

## Still open — yours to decide

There's no single right answer to any of these. There is a wrong answer:
"we never thought about it." Write your answer and reason here as you settle
each one, or log it under Decisions below.

**- Can `message` be empty? Whitespace only? Very long?** Not empty and not only whaitespaces, at most 100 chars.
**- What does the feed show when it's empty?** A sad face.

- **Does anything survive a page refresh — and if so, how?** Yes. The browser's
  `localStorage` keeps the client-side wall between refreshes.
- **If a kudos references a colleague no longer in the list, what happens?**
  The feed keeps the kudos and shows "Former colleague" for that person.
- **Where does validation live, and is it in one place or several?** Message
  validation lives in the domain module and the form calls that single helper.
- **How do you keep things fast as the feed grows — recompute on every render,
  or keep a running total somewhere?** The feed is sorted in a `useMemo` only
  when the kudos list changes; no separate running total is needed.

## Decisions

- We chose to persist kudos in `localStorage` because the app has no backend and
  losing the wall on every refresh would make the MVP difficult to use.
- We chose to keep validation in the domain module and call it from the form,
  so message rules have one source of truth.
- We chose to sort a copied list with `useMemo` when the feed changes. This keeps
  the store simple while avoiding repeated sorting during unrelated renders.

## Deliberately out of scope

Authentication. A backend. A database. Notifications. Editing a sent kudos.
Comment threads. Rich text. Image uploads. If you're building any of these,
you've drifted.
