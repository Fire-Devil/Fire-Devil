##Git Work Flow##


#To Start Working

1.Fork the repo.

2.Clone to local computer.

`$ git remote add upstream https://github.com/Fire-Devil/Fire-Devil/`

3.From  master, checkout feature_branch.

`$ git co -b feature_branch`

Name branch after its purpose and work on the branch...

4.Add and commit branch. (don't push)

`$git add .`
`$git commit -m 'short description of changes made'`

5.Add upstream commits to feature branch (make sure you are on feature branch).

`$ git pull --rebase upstream development`

_If there is a merge conflict, resolve the conflicts and proceed._

`$git --rebase continue`
`$git add .`


_After merge conflicts resolves/no conflicts originally._

`$git push origin branch`

Note: If the 'origin branch' was pushed prior to rebasing, you may need to use `git push origin branch -f` after rebasing to force the git push.

Example of the error:
```
https://github.com/cyanCYMK/Fire-Devil.git
 ! [rejected]        issue56 -> issue56 (non-fast-forward)
error: failed to push some refs to 'https://github.com/cyanCYMK/Fire-Devil.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

6.Github submission. (see below)

Update your local master.

7.Update your local master.

`$ git pull upstream development`

_if pull requests have been accepted to development while yours
was pending, please repeat step 5 to sync your fork with fire-devil developent branch_

To start working on next feature

8.Go to step 4.

#Github Submission

Go to GitHub and send pull request to the fire-devil organization branch.

Please reference in the pull request comment the corresponding issue using the [supported keywords](https://help.github.com/articles/closing-issues-via-commit-messages/).

For example: 'This closes #27 and closes #5.'

2 people from the organization must read before a pull of lengthy or important code is accepted. 1 person only can accept code that is short or trivial.

#References

http://www.thumbtack.com/engineering/linear-git-history/
