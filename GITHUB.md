# 🚀 How to Put Your Webpage on GitHub

You can get your webpage onto GitHub by initializing a local Git repository in your project folder, creating a new repository on the GitHub website, and then "pushing" your local code up to GitHub.

---

## ⚙️ Step 1: Prepare Your Local Project (Terminal)

First, you need to turn your local webpage directory into a Git repository.

1.  Open your terminal (like Command Prompt, PowerShell, or Terminal on Mac/Linux).
2.  Navigate to your project's directory using the `cd` (change directory) command.
    ```bash
    # Example:
    cd path/to/your/webpage-folder
    ```
3.  Initialize a new Git repository. This creates a hidden `.git` folder to track your changes.
    ```bash
    git init
    ```
4.  Add all your files (like `index.html`, `style.css`, etc.) to Git's "staging area." The `.` means "all files in this folder."
    ```bash
    git add .
    ```
5.  "Commit" your files. This takes a snapshot of your files and saves it to the repository's history.
    ```bash
    git commit -m "Initial commit"
    ```

---

## ☁️ Step 2: Create a New Repository on GitHub

Next, you need to create an empty "box" on GitHub to hold your files.

1.  Log in to your [GitHub](https://github.com/) account.
2.  In the top-right corner, click the **+** icon and select **New repository**.
3.  Give your repository a name (e.g., `my-cool-webpage`).
4.  You can add a description, but this is optional.
5.  > **Important:** Do **NOT** initialize the repository with a README, .gitignore, or license. Since you already have a project, you want this new repository to be completely empty.
6.  Click the **Create repository** button.

---

## 🔗 Step 3: Connect and Push Your Code

Now you'll link your local repository to the remote one on GitHub and upload your code.

1.  On the GitHub page for your new repository, look for the "…or push an existing repository from the command line" section.
2.  Copy the two or three lines of commands it gives you. They will look like this:
    ```bash
    # This command links your local repo to the remote one on GitHub
    git remote add origin [https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git)
    
    # This command renames your default branch to "main" (a modern standard)
    git branch -M main
    
    # This command "pushes" (uploads) your "main" branch to "origin" (GitHub)
    git push -u origin main
    ```
3.  Paste those commands into your terminal (in your project folder) and press Enter.

Your code is now on GitHub! You can refresh your GitHub repository page to see your files.

---

## 🚀 Bonus Step: Make Your Webpage Live with GitHub Pages

Since this is a webpage, you probably want to see it live on the internet. GitHub Pages can host it for free.

1.  On your GitHub repository page, click the **Settings** tab.
2.  In the left-hand menu, click on **Pages**.
3.  Under the "Build and deployment" section, set the **Source** to **Deploy from a branch**.
4.  Under "Branch," select **main** and keep the folder as **`/root`**.
5.  Click **Save**.

After a minute or two, GitHub will publish your site. You'll see a green message at the top of the Pages settings with the live URL, which will be something like:
`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## 🌿 How to Make Changes Safely with Branches

Using branches is the best way to experiment with new ideas (like a new color scheme or layout) without affecting your live `main` branch.

### 1. Create and Switch to a New Branch

First, make sure you are on your main branch.

```bash
# Switch to your main branch
git checkout main