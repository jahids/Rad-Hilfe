# Github instructions for teammates

1. git clone -b dev https://github.com/Project-Code-Projects/Rad-Hilfe.git

2. git checkout -b <your_branch_name>

3. Work in your own branch. Add (git add .) and Commit (git commit -m "") at a regular interval.

4. When it's time to merge, git checkout dev && git pull origin dev && git merge <your_branch_name> && git push origin dev

5. git checkout <your_branch_name> and start working again.

6. Whenever you want your branch to be update with dev branch type git fetch origin && git merge origin/dev.

# Github commit message instruction

1. Add some words before your commit message to make it clear for others. Following are some words that can be added and their usecase.

## Words to add before commit messages

- **Add** -> when adding a file or folder or logic or styles in the project
- **Feat** -> when implementing a new feature
- **Modify** -> when modifying a logic or style
- **Remove** -> when removing or cleaning unused code
- **Fix** -> when fixing an issue in logic or style

- **Misc** -> when nothing else comes to mind
