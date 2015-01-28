<<<<<<< HEAD
##Git Work Flow##

#To Start Working

1.Fork the repo.

2.Clone to local computer.

`$ git remote add upstream organization_url`

3.From  master, checkout feature_branch.

`$ git co -b feature_branch`

Name branch after its purpose and work on the branch...

4.Add and commit branch. (don't push)

`$git add .`
`$git commit -m 'short description of changes made'`

5.Add upstream commits to feature branch.

`$ git pull --rebase upstream master`

_If there is a merge conflict, resolve the conflicts and proceed._

`$git --rebase continue`
`$git add .`

_After merge conflicts resolves/no conflicts originally._

`$git push origin branch`

6.Github submission. (see below)

Update your local master.

7.Update your local master.

`$ git pull upstream master`

To start working on next feature

8.Go to step 4.

#Github Submission

Go to GitHub and send pull request to the fire-devil organization branch.

Please reference in the pull request comment the corresponding issue using the [supported keywords](https://help.github.com/articles/closing-issues-via-commit-messages/).

For example: 'This closes #27 and closes #5.'

2 people from the organization must read before a pull of lengthy or important code is accepted. 1 person only can accept code that is short or trivial.

#References

http://www.thumbtack.com/engineering/linear-git-history/
=======
##Git Work Flow##

#To Start Working

1.Fork the repo.

2.Clone to local computer.

`$ git remote add upstream organization_url`

3.From  master, checkout feature_branch.

`$ git co -b feature_branch`

Name branch after its purpose and work on the branch...

4.Add & commit branch (dont push)

`$git add .`
`$git commit -m 'short description of changes made'`

5.Add upstream commits to feature branch.

`$ git pull --rebase upstream master`

_If there is a merge conflict, resolve the conflicts and proceed._

`$git --rebase continue`
`$git add .`

_After merge conflicts resolves/no conflicts originally._

`$git push origin branch`

6.Github submission (see below).

Update your local master.

7.Update your local master.

`$ git pull upstream master`

To start working on next feature

8.Go to step 4

#Github Submission

Go to GitHub and send pull request to the fire-devil organization branch.

Please reference in the pull request comment the corresponding issue using the [supported keywords](https://help.github.com/articles/closing-issues-via-commit-messages/).
For example: This closes #27 and closes #5.

2 people from the organization must read before a pull of lengthy or important code is accepted. 1 person only can accept code that is short or trivial.

#References

http://www.thumbtack.com/engineering/linear-git-history/
>>>>>>> Minor editing to README, STYLEGUIDE and CONTRIBUTING (git workflow)
