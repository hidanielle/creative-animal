## Clone the template

1. Login to the Github website and create a new repo (i.e. **new-project-repo**). Leave the "Initialize this repository with a README" checkbox unchecked.

2. Create a new directory on your local machine (i.e. **new-project-dir**).

3. Navigate to the new directory's parent directory via command line.

4. Clone the **grunt-boilerplate** repo into your new directory:

        git clone https://github.com/hidanielle/grunt-boilerplate.git new-project-dir

5. Navigate into your new directory:

        cd new-project-dir

6. Disconnect the cloned repo from the remote repo (leaving it pointing at nothing):

        git remote rm origin

7. Connect the cloned repo to the new repo you created in step 1 (copy and paste the repo path from github):

        git remote add origin https://github.com/hidanielle/new-project-repo.git

8. Push your local files to the remote repo:

        git push -u origin master 