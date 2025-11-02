# Git Branching Workflow: Test & Merge

This guide covers the standard workflow for creating a "playground" branch to test changes, and then either merging those changes or deleting the branch.

## 1. 🚀 Create and Switch to Your New Branch

First, ensure your main branch (`main` or `master`) is up to date.

```bash
# Switch to your main branch
git checkout main

# Pull the latest changes from the remote
git pull
```

Now, create and switch to your new branch in one command. We'll call it `my-new-feature`.

```bash
# Creates 'my-new-feature' AND switches you to it
git checkout -b my-new-feature
```

> **Note:** You are now on your new branch. Any changes you make will only affect this branch.

## 2. 👩‍💻 Work on Your Changes

Make any modifications you want to your files. When you're ready to save a snapshot of your work, you **add** and **commit** your changes.

```bash
# 1. Add the files you changed (use "." to add all changes in the folder)
git add .

# 2. Save your changes with a descriptive message
git commit -m "Add my new feature"
```

You can make as many commits as you need on this branch. Your `main` branch remains untouched.

## 3. 🤔 Decide: Keep or Delete?

After your work, you have two options: the changes are good, or they are not.

### Option A: 👎 The Changes Are Not Good (Delete the Branch)

If you decide to abandon your modifications, you can easily delete the branch.

1.  **Switch back to your `main` branch.** You cannot delete a branch you are currently on.
    ```bash
    git checkout main
    ```

2.  **Delete your branch.** Because this branch was never merged, you must use a capital **`-D`** to "force" delete it.
    ```bash
    # -D forcefully deletes the branch and all its changes
    git branch -D my-new-feature
    ```

Your experimental changes are now gone, and your project is back to how it was.

### Option B: 👍 The Changes Are Good (Merge the Branch)

If you're happy with your changes, you can merge them into your `main` branch.

1.  **Switch back to your `main` branch.** You always merge *into* the branch you are currently on.
    ```bash
    git checkout main
    ```

2.  **Make sure `main` is up to date.** This is important to avoid conflicts if someone else made changes.
    ```bash
    git pull
    ```

3.  **Merge your feature branch into `main`.**
    ```bash
    git merge my-new-feature
    ```
    Your `main` branch now includes all the commits you made on the `my-new-feature` branch.

4.  **(Optional Cleanup)** After a successful merge, you no longer need the local feature branch. You can safely delete it with **`-d`** (lowercase).
    ```bash
    # -d (lowercase) safely deletes an already-merged branch
    git branch -d my-new-feature
    ```