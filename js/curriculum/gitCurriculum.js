export const GIT_CURRICULUM = {
  'git-1': {
    id: 'git-1',
    title: 'Git Basics & The 3 Stages',
    category: 'Git & GitHub',
    diagramType: 'git-stages',
    hasPlayground: false,
    codeLanguage: 'bash',
    codeType: 'bash',
    codeSnippet: `# Git Essential Workflow Commands

# 1. Initialize a new local Git repository
git init

# 2. Check repository status and tracked files
git status

# 3. Stage changes to the Staging Area (Index)
git add index.html style.css
# Or stage all modified files:
git add .

# 4. Commit staged snapshot to local repository history
git commit -m "feat: implement responsive navigation bar and hero layout"

# 5. View formatted commit history log
git log --oneline --graph --decorate`,
    overview: {
      what: 'Git is a distributed version control system (VCS) that tracks changes in computer files, allowing multiple developers to collaborate, inspect revision history, revert mistakes, and manage parallel branches of codebase development.',
      why: 'Without version control, developers risk overwriting each other\'s code, losing work, and having zero audit trails for bugs. Git is the universal industry standard for software engineering source control across all technology companies worldwide.',
      whereUsed: 'Universal across every professional software engineering team, open-source repositories (GitHub, GitLab, Bitbucket), and CI/CD automated deployment pipelines.'
    },
    coreConcepts: [
      {
        title: 'The 3 Stages of Git Architecture',
        explanation: 'A local Git project consists of three distinct states/trees: The Working Directory, the Staging Area (Index), and the Git Repository (`.git` directory / commit history).',
        terms: [
          { term: 'Working Directory', definition: 'The active sandbox files on your local filesystem that you are currently editing.' },
          { term: 'Staging Area (Index)', definition: 'The intermediate staging zone where files are organized and reviewed (`git add`) before being permanently committed.' },
          { term: 'Commit History (.git)', definition: 'The permanent database storing cryptographic SHA-1/SHA-256 snapshots of the repository (`git commit`).' }
        ],
        relationship: 'You edit in the Working Directory -> stage specific changes with `git add` -> record a permanent snapshot with `git commit`.'
      },
      {
        title: 'Commits as Immutable Snapshots',
        explanation: 'Unlike legacy VCS tools that store file diff deltas, Git captures a complete snapshot of all files at each commit and points to them with a cryptographic hash.',
        terms: [
          { term: 'Commit Hash (SHA)', definition: 'Unique 40-character identifier (e.g. `a1b2c3d`) uniquely identifying each snapshot.' },
          { term: 'HEAD', definition: 'A pointer referencing the current branch and most recent commit checked out in your working tree.' },
          { term: '.gitignore', definition: 'Configuration file listing files and directories (e.g. `node_modules/`, `.env`) that Git must ignore.' }
        ],
        relationship: 'Commits form a directed acyclic graph (DAG) tracking the complete lineage of code evolution.'
      }
    ],
    syntaxStructure: {
      generalStructure: `# Standard Git Daily Workflow
git status                     # 1. Inspect modified files
git add <filename>             # 2. Stage changes
git commit -m "type: message"  # 3. Record snapshot
git log --oneline              # 4. Review history`,
      breakdown: [
        { part: 'git add .', meaning: 'Stages all modified and untracked files in the current directory and subdirectories.' },
        { part: 'git commit -m "message"', meaning: 'Creates snapshot with a mandatory descriptive message.' }
      ],
      conventions: [
        'Write Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.',
        'Commit small, atomic changes frequently rather than massive 2,000-line monolithic commits.',
        'Never commit sensitive credentials, API keys, or `.env` files. Always list them in `.gitignore`.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Initializing and Making Your First Commit',
        description: 'Creating a Git repo and committing a new project skeleton.',
        code: `# Navigate to project folder
cd my-web-app

# Initialize Git
git init

# Stage all project files
git add index.html app.js styles.css

# Make initial commit
git commit -m "feat: initial project skeleton and styles"`,
        explanation: 'Establishes the root commit of your project repository.'
      },
      {
        level: 'Intermediate',
        title: 'Inspecting Diffs and Discarding Unstaged Changes',
        description: 'Comparing differences between working directory and the last commit.',
        code: `# View exact line-by-line changes before staging
git diff

# View line changes that have already been staged
git diff --staged

# Discard unwanted changes in a specific file (restore to last commit)
git restore styles.css

# Unstage a file without losing local edits
git restore --staged styles.css`,
        explanation: '`git diff` and `git restore` allow fine-grained inspection and rollback of local mistakes.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Configuring a Production `.gitignore` File',
        description: 'Preventing heavy dependencies and secrets from being committed.',
        code: `# .gitignore file in project root

# Dependencies
node_modules/
vendor/

# Environment Variables & Secrets (CRITICAL)
.env
.env.local
.env.production
*.pem
*.key

# Build Outputs
dist/
build/
.next/

# Operating System Files
.DS_Store
Thumbs.db`,
        explanation: 'Protects application security and keeps repository size lean.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Configure Git Identity',
        instruction: 'Set your global user name and email before making commits.',
        whyNecessary: 'Associates your author identity with every commit you create.',
        codeSnippet: `git config --global user.name "Your Name"\ngit config --global user.email "your.email@example.com"`
      },
      {
        step: 2,
        title: 'Create `.gitignore` First',
        instruction: 'Create `.gitignore` before running `git add .` to ignore `node_modules/` and `.env`.',
        whyNecessary: 'Prevents massive dependency files and secret API keys from being tracked.',
        codeSnippet: `echo "node_modules/" >> .gitignore\necho ".env" >> .gitignore`
      },
      {
        step: 3,
        title: 'Stage and Commit in Atomic Units',
        instruction: 'Stage related changes together and commit with clear Conventional Commit messages.',
        whyNecessary: 'Makes reviewing pull requests and reverting bugs effortless.',
        codeSnippet: `git add src/components/Header.jsx\ngit commit -m "feat(ui): add responsive navigation links"`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Follow the Conventional Commits specification (`feat:`, `fix:`, `refactor:`).',
        'Commit early and often with focused, single-purpose changes.',
        'Always review `git status` and `git diff` before executing `git commit`.'
      ],
      structureRecommendations: [
        'Maintain a clean `.gitignore` at the repository root.'
      ],
      performanceConsiderations: [
        'Never track large binary media files (videos, huge zip archives) directly in Git; use Git LFS (Large File Storage) if necessary.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Accidentally committing `.env` containing live database credentials or Stripe secret keys.',
        howToAvoid: 'Add `.env` to `.gitignore` before your first `git add .`.',
        debuggingTip: 'Check `git status` to ensure `.env` is not in the "Changes to be committed" list.'
      },
      {
        mistake: 'Writing vague commit messages like "fix stuff" or "updates".',
        howToAvoid: 'Use clear action descriptions: `fix: resolve mobile navbar overflow on iOS Safari`.',
        debuggingTip: 'Read your commit history with `git log --oneline`.'
      }
    ],
    projectApplications: [
      {
        domain: 'Collaborative Team Software Development',
        description: 'Tracking code changes, authorship, and feature releases across dozens of engineers.'
      },
      {
        domain: 'Automated CI/CD Deployments',
        description: 'Triggering automated test runs and production cloud deployments whenever a commit is pushed to the `main` branch.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Initialize a Git repository in a test folder, create `README.md`, stage it, and make your first commit.',
        'Modify `README.md`, inspect changes with `git diff`, stage changes with `git add`, and inspect `git diff --staged`.'
      ],
      codingChallenge: {
        prompt: 'Use `git restore` to discard unstaged modifications in a file without affecting other staged changes.',
        hint: 'Use `git restore <filename>`.'
      },
      miniProjectIdea: {
        title: 'Git Version History Simulation',
        description: 'Build a sample multi-file project and make 5 distinct atomic commits (feat, fix, docs, refactor, test) and inspect the tree with `git log --graph --oneline`.'
      }
    },
    summary: {
      keyPoints: [
        'Git operates across 3 trees: Working Directory -> Staging Area -> Commit History.',
        '`git add` stages changes; `git commit` records permanent immutable snapshots.',
        '`.gitignore` prevents credentials and bulky build artifacts from entering the repository.'
      ],
      skillsAcquired: [
        'Proficiency with foundational Git commands (`init`, `add`, `commit`, `status`, `diff`, `log`).',
        'Mastery of the 3-stage Git mental model.',
        'Ability to write clean, industry-standard conventional commit histories.'
      ]
    },
    exercise: {
      question: 'Which command moves modified files from the Working Directory into the Staging Area (Index)?',
      options: ['git add', 'git commit', 'git push', 'git checkout'],
      answer: 'git add'
    },
    exam: {
      question: 'Why is committing a `.env` file containing API keys into a public Git repository a critical security vulnerability?',
      options: [
        'Git records an immutable history of all commits, meaning anyone with access to the repo can inspect past commits and extract your secret credentials',
        'It causes Git to run out of memory',
        'It converts the repo to read-only mode',
        'Git cannot parse `.env` files'
      ],
      answer: 'Git records an immutable history of all commits, meaning anyone with access to the repo can inspect past commits and extract your secret credentials'
    },
    materialUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Git-Basics'
  },

  'git-2': {
    id: 'git-2',
    title: 'Branching, Merging & Conflict Resolution',
    category: 'Git & GitHub',
    diagramType: 'git-stages',
    hasPlayground: false,
    codeLanguage: 'bash',
    codeType: 'bash',
    codeSnippet: `# Branching and Merging Workflow

# 1. Create and switch to a new feature branch
git switch -c feature/user-auth
# (Legacy equivalent: git checkout -b feature/user-auth)

# 2. Make changes and commit on your branch
git add .
git commit -m "feat(auth): add JWT login authentication handler"

# 3. Switch back to main branch
git switch main

# 4. Merge feature branch into main
git merge feature/user-auth

# 5. Delete merged local branch
git branch -d feature/user-auth`,
    overview: {
      what: 'Branching in Git allows developers to diverge from the main line of development to work on new features, bug fixes, or experimental code in complete isolation. Merging integrates changes from one branch into another, with Git resolving non-overlapping changes automatically and prompting developers during Merge Conflicts.',
      why: 'Branching enables parallel team collaboration without breaking the production `main` branch. Developers can experiment freely, test thoroughly, and integrate features only when verified.',
      whereUsed: 'Universal: GitHub flow, GitFlow branching models, trunk-based development, and agile sprint workflows.'
    },
    coreConcepts: [
      {
        title: 'Lightweight Pointers & `git switch`',
        explanation: 'In Git, a branch is simply a lightweight 41-byte movable pointer to a specific commit. Creating a branch is instantaneous and does not duplicate files on disk.',
        terms: [
          { term: 'main / master', definition: 'The primary default branch representing production-ready code.' },
          { term: 'Feature Branch', definition: 'A dedicated temporary branch created for a specific feature (e.g. `feature/checkout-ui`).' },
          { term: 'git switch -c <name>', definition: 'Modern command to create and immediately switch to a new branch.' }
        ],
        relationship: '`HEAD` points to the active branch; the active branch points to the latest commit.'
      },
      {
        title: 'Fast-Forward vs 3-Way Merges & Conflict Resolution',
        explanation: 'If `main` has not changed since you branched, Git performs a Fast-Forward merge by simply moving the pointer forward. If both branches have new commits, Git creates a 3-way merge commit.',
        terms: [
          { term: 'Fast-Forward Merge', definition: 'Pointer simply advances forward without creating a new merge commit.' },
          { term: '3-Way Merge Commit', definition: 'Combines two divergent branches with a dedicated merge commit.' },
          { term: 'Merge Conflict', definition: 'Occurs when both branches modified the EXACT same lines in the same file; Git marks the conflict with `<<<<<<<`, `=======`, and `>>>>>>>` markers for human resolution.' }
        ],
        relationship: 'Git automatically merges non-overlapping changes; human intervention is only required during direct line collisions.'
      }
    ],
    syntaxStructure: {
      generalStructure: `# Branch Operations
git branch                      # List local branches
git switch -c feature/<name>    # Create & switch to branch
git switch main                 # Switch back to main
git merge feature/<name>        # Merge branch into current branch
git branch -d feature/<name>    # Delete merged branch`,
      breakdown: [
        { part: 'git switch -c feature/login', meaning: 'Creates branch "feature/login" and switches HEAD to it.' },
        { part: 'git merge feature/login', meaning: 'Integrates feature/login into the currently checked-out branch.' }
      ],
      conventions: [
        'Use standard branch naming prefixes: `feature/name`, `bugfix/issue-12`, `hotfix/crash`.',
        'Always pull the latest `main` before branching or merging.',
        'Delete feature branches after successful merging to keep the repository clean.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Creating and Switching Feature Branches',
        description: 'Isolating a new feature on a dedicated branch.',
        code: `# Check current branch
git branch

# Create and switch to new feature branch
git switch -c feature/dark-mode

# Edit files and commit
git add .
git commit -m "feat(theme): add dark mode CSS custom properties"

# Return to main
git switch main`,
        explanation: 'Modern `git switch` syntax is cleaner and less error-prone than legacy `git checkout`.'
      },
      {
        level: 'Intermediate',
        title: 'Resolving a Git Merge Conflict',
        description: 'Resolving conflicting edits in `index.html`.',
        code: `# When merge conflict occurs, Git outputs:
# CONFLICT (content): Merge conflict in index.html

# Open index.html to see conflict markers:
<<<<<<< HEAD (Current on main)
<h1 class="title">Welcome to Roadmap Tracker v2</h1>
=======
<h1 class="title">Welcome to Roadmap Platform</h1>
>>>>>>> feature/branding

# Manually edit the file to the desired final version:
<h1 class="title">Welcome to Roadmap Tracker Platform v2</h1>

# Stage the resolved file and finalize merge:
git add index.html
git commit -m "merge: resolve title conflict between main and feature/branding"`,
        explanation: 'Remove the `<<<<<<<`, `=======`, `>>>>>>>` conflict markers, save the resolved code, and commit.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Git Rebase Workflow for Clean Linear History',
        description: 'Rebasing your feature branch on top of latest `main` before submitting a PR.',
        code: `# On feature branch:
git switch feature/payment-gateway

# Rebase your commits on top of latest main:
git rebase main

# Rebase moves your feature commits to the tip of main, creating a clean linear commit graph!`,
        explanation: '`git rebase` replays your commits on top of upstream changes, eliminating clutter merge commits.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Ensure `main` is Up-To-Date',
        instruction: 'Switch to `main` and pull latest changes before branching.',
        whyNecessary: 'Ensures your branch starts from the freshest codebase.',
        codeSnippet: `git switch main\ngit pull origin main`
      },
      {
        step: 2,
        title: 'Create Isolated Feature Branch',
        instruction: 'Run `git switch -c feature/your-feature-name`.',
        whyNecessary: 'Keeps `main` clean and buildable at all times.',
        codeSnippet: `git switch -c feature/auth-modal`
      },
      {
        step: 3,
        title: 'Merge and Delete Branch',
        instruction: 'Switch back to `main`, merge the branch, and delete the feature branch.',
        whyNecessary: 'Finalizes code integration and keeps the branch list tidy.',
        codeSnippet: `git switch main\ngit merge feature/auth-modal\ngit branch -d feature/auth-modal`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Never commit directly to `main` in production team environments.',
        'Keep feature branches short-lived (1-3 days max) to prevent painful merge conflicts.',
        'Always delete merged branches.'
      ],
      structureRecommendations: [
        'Prefix branches with clear category tags (`feature/`, `fix/`, `chore/`).'
      ],
      performanceConsiderations: [
        'Git branch switching is instantaneous because branches are simply 41-byte pointer references.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Leaving raw Git conflict markers (`<<<<<<<`, `=======`) inside files and committing them.',
        howToAvoid: 'Search your files for `<<<<<<<` before staging.',
        debuggingTip: 'Check for syntax errors caused by unremoved merge markers.'
      },
      {
        mistake: 'Committing code on `main` by accident instead of a feature branch.',
        howToAvoid: 'Run `git branch` or look at your terminal prompt before writing code.',
        debuggingTip: 'Use `git switch -c feature/name` to move uncommitted changes to a new branch.'
      }
    ],
    projectApplications: [
      {
        domain: 'Multi-Developer Agile Sprints',
        description: 'Allowing 10+ engineers to build different dashboard features simultaneously without collision.'
      },
      {
        domain: 'Hotfix & Release Management',
        description: 'Branching off production tags to release emergency bug fixes while feature development continues on development branches.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a branch `feature/navbar`, add a new header element, switch back to `main`, and merge it.',
        'Intentionally create a merge conflict by editing the same line on two branches, then resolve the conflict markers manually.'
      ],
      codingChallenge: {
        prompt: 'Use `git branch -d` to safely delete a merged branch and `git branch -D` to force-delete an unmerged experimental branch.',
        hint: 'Use `git branch -d <name>` for safe delete.'
      },
      miniProjectIdea: {
        title: 'Multi-Branch Release Workflow Simulation',
        description: 'Simulate a team workflow: create `feature/ui` and `feature/api`, make concurrent commits, merge both into `main`, and resolve any resulting conflicts.'
      }
    },
    summary: {
      keyPoints: [
        'Branches provide isolated sandboxes for feature development without disrupting `main`.',
        'Git performs fast-forward merges or 3-way merges automatically.',
        'Merge conflicts are resolved by removing conflict markers and committing the unified result.'
      ],
      skillsAcquired: [
        'Mastery of Git branching and switching (`git switch -c`).',
        'Proficiency in merging feature branches into `main`.',
        'Confidence in identifying and resolving merge conflict markers.'
      ]
    },
    exercise: {
      question: 'Which modern command creates a new branch and immediately switches to it in one step?',
      options: ['git switch -c <branch-name>', 'git branch -new <branch-name>', 'git merge <branch-name>', 'git create <branch-name>'],
      answer: 'git switch -c <branch-name>'
    },
    exam: {
      question: 'What do the `<<<<<<< HEAD`, `=======`, and `>>>>>>> feature-branch` markers indicate when encountered in a file after a merge?',
      options: [
        'A Merge Conflict where Git requires the developer to choose or combine conflicting edits from both branches',
        'A successful automatic merge confirmation',
        'A corrupted Git repository database',
        'A syntax error in JavaScript'
      ],
      answer: 'A Merge Conflict where Git requires the developer to choose or combine conflicting edits from both branches'
    },
    materialUrl: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging'
  },

  'git-3': {
    id: 'git-3',
    title: 'Pull Requests & Remote Collaboration',
    category: 'Git & GitHub',
    diagramType: 'git-stages',
    hasPlayground: false,
    codeLanguage: 'bash',
    codeType: 'bash',
    codeSnippet: `# Remote GitHub Collaboration Workflow

# 1. Link local repository to remote GitHub repository
git remote add origin https://github.com/username/my-project.git

# 2. Push local main branch to remote
git push -u origin main

# 3. Push a feature branch to remote for Pull Request
git switch -c feature/user-profile
git add .
git commit -m "feat: add user profile page and avatar uploader"
git push -u origin feature/user-profile

# 4. Fetch and Pull latest updates from teammates
git pull origin main`,
    overview: {
      what: 'Remote collaboration in Git involves connecting local repositories to remote cloud hosting services (GitHub, GitLab, Bitbucket) via `git remote`, synchronizing commits using `push` and `pull`, and submitting Pull Requests (PRs) / Merge Requests (MRs) for peer code review before merging into production.',
      why: 'Pull Requests are the cornerstone of professional software engineering—enabling team code reviews, automated CI/CD test runs, discussions, security scans, and governance before code reaches production users.',
      whereUsed: 'Universal across all open-source repositories and software development companies worldwide (Google, Microsoft, Meta, Netflix).'
    },
    coreConcepts: [
      {
        title: 'Remotes, Upstream & Tracking Branches',
        explanation: 'A remote is a shared repository hosted on the internet or network. `origin` is the conventional default name given to the primary remote repository.',
        terms: [
          { term: 'origin', definition: 'The alias nickname for the primary remote repository URL.' },
          { term: 'git push -u origin <branch>', definition: 'Uploads local branch commits to the remote and sets upstream tracking.' },
          { term: 'git pull origin main', definition: 'Fetches changes from remote and merges them into the current local branch (`fetch` + `merge`).' }
        ],
        relationship: '`git push` uploads your local commits; `git pull` downloads and merges teammates\' commits.'
      },
      {
        title: 'The Pull Request (PR) & Code Review Lifecycle',
        explanation: 'A Pull Request is a formal proposal submitted on GitHub/GitLab to merge changes from a feature branch into the target base branch (e.g. `main`), allowing team members to review line-by-line diffs, leave comments, and approve.',
        terms: [
          { term: 'Code Review', definition: 'Peers examine code quality, security, and edge cases before approval.' },
          { term: 'CI/CD Status Checks', definition: 'Automated test runners (GitHub Actions) that must pass green before merging is permitted.' },
          { term: 'Squash and Merge', definition: 'Condenses all commits from a feature branch into a single clean commit on `main`.' }
        ],
        relationship: 'Feature branch -> Push to Remote -> Open Pull Request -> Pass CI & Peer Review -> Merge into Main.'
      }
    ],
    syntaxStructure: {
      generalStructure: `# Daily Remote Sync Workflow
git remote -v                       # Check linked remote URLs
git fetch origin                    # Download remote updates without merging
git pull origin main                # Fetch & merge latest main
git push -u origin feature/<name>   # Push branch to GitHub`,
      breakdown: [
        { part: 'git remote add origin <url>', meaning: 'Registers the cloud repository URL under alias "origin".' },
        { part: 'git push -u origin <branch>', meaning: 'Sets upstream tracking and pushes commits to remote.' }
      ],
      conventions: [
        'Always create a clear PR title and summary description explaining WHAT changed and WHY.',
        'Run tests locally before opening a Pull Request.',
        'Keep PRs small (< 400 lines) so reviewers can thoroughly inspect changes quickly.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Connecting Local Repository to GitHub',
        description: 'First-time setup linking a local repo to a newly created GitHub repository.',
        code: `# Link to GitHub repository
git remote add origin https://github.com/yourname/my-app.git

# Set default branch name to main
git branch -M main

# Push all commits and set upstream
git push -u origin main`,
        explanation: '`-u origin main` links your local main branch to origin/main for future one-word `git push` commands.'
      },
      {
        level: 'Intermediate',
        title: 'Publishing a Feature Branch and Opening a PR',
        description: 'Pushing a feature branch to GitHub to trigger a Pull Request.',
        code: `# Create feature branch
git switch -c feature/stripe-checkout

# Commit changes
git add .
git commit -m "feat(billing): integrate Stripe checkout session API"

# Push to GitHub
git push -u origin feature/stripe-checkout

# Output will provide a direct clickable link to open a PR on GitHub!`
      },
      {
        level: 'Real-World Use Case',
        title: 'Syncing a Forked Open Source Repository',
        description: 'Keeping a local open-source fork synchronized with the upstream master project.',
        code: `# Add original upstream repository
git remote add upstream https://github.com/facebook/react.git

# Fetch latest upstream changes
git fetch upstream

# Merge upstream main into your local main branch
git switch main
git merge upstream/main

# Push updated main to your personal GitHub fork
git push origin main`,
        explanation: 'Standard open-source workflow for keeping contributor forks fresh with upstream changes.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Configure Remote Repository',
        instruction: 'Add your remote with `git remote add origin <URL>`.',
        whyNecessary: 'Establishes the network link between local and cloud repos.',
        codeSnippet: `git remote add origin https://github.com/org/repo.git`
      },
      {
        step: 2,
        title: 'Push Feature Branch to Remote',
        instruction: 'Execute `git push -u origin feature/your-branch`.',
        whyNecessary: 'Makes your branch available on GitHub for the team to view.',
        codeSnippet: `git push -u origin feature/dashboard-charts`
      },
      {
        step: 3,
        title: 'Open Pull Request & Request Review',
        instruction: 'Go to GitHub, click "Compare & pull request", fill in the description, and assign reviewers.',
        whyNecessary: 'Enables peer review and automated CI test execution before merging.',
        codeSnippet: `# Open PR via GitHub Web UI or GitHub CLI: gh pr create`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Protect the `main` branch with branch protection rules requiring at least 1 approving code review.',
        'Require all automated CI test workflows (Lighthouse, unit tests, ESLint) to pass before merging.',
        'Keep Pull Requests focused and concise.'
      ],
      structureRecommendations: [
        'Use a standard Pull Request markdown template (`.github/pull_request_template.md`) with a checklist.'
      ],
      performanceConsiderations: [
        'Use "Squash and Merge" on GitHub to condense 15 messy WIP commits into 1 clean commit on the `main` history.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using `git push --force` on shared team branches (overwrites teammates\' commits!).',
        howToAvoid: 'Never force-push to shared branches. Use `--force-with-lease` if force-pushing to your own private feature branch.',
        debuggingTip: 'Check if commits vanished from the remote repository.'
      },
      {
        mistake: 'Opening a massive 5,000-line PR that is impossible for peers to review effectively.',
        howToAvoid: 'Break large projects into smaller, incremental PRs.',
        debuggingTip: 'Check total line diff before submitting.'
      }
    ],
    projectApplications: [
      {
        domain: 'Open Source Software Contributions',
        description: 'Forking popular open-source libraries, fixing bugs, and submitting upstream PRs.'
      },
      {
        domain: 'Enterprise Code Review Workflows',
        description: 'Enforcing security audits, peer review approvals, and automated compliance testing in high-scale engineering organizations.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a GitHub repository, push your local project to it, and verify the commit log in the GitHub browser UI.',
        'Create a feature branch, push it to GitHub, and open a Pull Request with a descriptive summary.'
      ],
      codingChallenge: {
        prompt: 'Use `git remote -v` to inspect your linked remotes and update the remote URL using `git remote set-url origin <new-url>`.',
        hint: 'Use `git remote set-url origin <URL>`.'
      },
      miniProjectIdea: {
        title: 'GitHub Team Collaboration Simulation',
        description: 'Practice the complete GitHub Flow: fork a repo, branch, commit, push, open a Pull Request, conduct a line-by-line review, address feedback, and merge.'
      }
    },
    summary: {
      keyPoints: [
        '`git remote` connects local repositories to cloud services like GitHub.',
        '`git push` uploads commits; `git pull` downloads and merges updates.',
        'Pull Requests facilitate peer code reviews, automated CI testing, and quality control before merging.'
      ],
      skillsAcquired: [
        'Proficiency in managing remote repositories and tracking branches.',
        'Mastery of the GitHub Flow and Pull Request lifecycle.',
        'Ability to collaborate effectively in distributed engineering teams.'
      ]
    },
    exercise: {
      question: 'Which Git command uploads local commits to a remote repository and sets upstream branch tracking?',
      options: ['git push -u origin <branch>', 'git pull origin <branch>', 'git remote sync', 'git upload <branch>'],
      answer: 'git push -u origin <branch>'
    },
    exam: {
      question: 'What is the primary role of a Pull Request (PR) in professional software engineering?',
      options: [
        'To provide a dedicated review interface where teammates inspect code diffs, discuss architecture, and verify automated CI tests before merging code into main',
        'To compile JavaScript into machine binary code',
        'To compress images for faster loading',
        'To delete unused Git branches automatically'
      ],
      answer: 'To provide a dedicated review interface where teammates inspect code diffs, discuss architecture, and verify automated CI tests before merging code into main'
    },
    materialUrl: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests'
  }
};
