##Git Work Flow##


#To Start Working

1.Fork the repo.

2.Clone to local computer.

3.Add upstream remote

`$ git remote add upstream https://github.com/Fire-Devil/Fire-Devil/`

4.From your local master, checkout a feature_branch to develop on. Name branch after its purpose and work on the branch...

`$ git co -b feature_branch`

5.Add and commit to your feature branch. (don't push)

`$git add .`
`$git commit -m 'short description of changes made'`

6.Add upstream commits to feature branch (make sure you are on feature branch).

`$ git pull --rebase upstream development`

_If there is a merge conflict, resolve the conflicts and proceed._

`$git --rebase continue`
`$git add .`

_After merge conflicts resolves/no conflicts originally._

`$git push origin branch`

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
