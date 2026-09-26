# Cabin Trip Expense Splitter

A small Next.js app for a group of four friends (Ana, Ben, Chloe, and Dev) to track
shared expenses on a trip. Anyone can add an expense, say who paid and who it was
split among, and the app shows who owes whom.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Data lives in memory on the server. Restarting `npm run dev` resets it to the seed data.

That in-memory data also survives hot reloads. If the app looks stale or confused after you change server code, restart `npm run dev`.

Useful commands:

```bash
npm run build   # type-checks and builds
npm run lint    # eslint
```

## Your task

Three bugs have been reported by the group. For each one:

1. Reproduce it.
2. Find the root cause.
3. Fix it.

Rules:

- Fix all three.
- `npm run build` and `npm run lint` must still pass when you're done.
- Make one commit per fix. The commit message should say what the root cause was.
- You may use any tools you like, including AI assistants.
- Budget about 45 minutes.

## Bug reports

### 1. "The split is wrong"

> I paid $30 for dinner for me, Ben, and Chloe. The app says I'm owed $30 and that
> Ben and Chloe each owe $15. We should each be on the hook for $10, so I should be
> owed $20.
>
> — Ana

### 2. "Deleting one expense removed a different one"

> I deleted the groceries expense, then added a new one for gas. Later I deleted the
> gas one and the firewood expense vanished with it. Reloading the page didn't bring
> it back.
>
> — Dev

### 3. "New expense shows a crazy amount"

> I added a $12.50 coffee run and the list showed it as $1,250.00. The balances went
> haywire too. After I refreshed, it was $12.50 like it should be.
>
> — Ben

## How balances work

Each expense is paid by one member and split evenly among its participants. A
member's balance is what they paid minus what they owe across all expenses. A
positive balance means the group owes them; a negative one means they owe the group.
