//Git Work Flow
###TO START WORKING###

1.Fork the repo

2.Clone to local computer
$ git remote add upstream organization_url

4. from  master checkout feature_branch
$ git co -b feature_branch

###NAME BRANCH AFTER IT'S PURPOSE###
work on branch....

5.add & commit branch(dont push)
$git add .
$git commit -m 'what i did'

6.add upstream commits to feature  branch


$ git pull --rebase upstream master

//if merge conflict

--resolve conflicts
$git --rebase continue
$git add .

//after merge conflicts resolves/no conflicts  originally

$git push origin branch


7.Github submission (see below) 

//update you local master
7.update you local master
$ git pull upstream master

//to start working on next feature
8. got to step 4


###Github submition
//go to github and send pull request to the fire-devil organization branch
//2 people from the organization must read before pull is accepted

#REFERENCES
http://www.thumbtack.com/engineering/linear-git-history/

