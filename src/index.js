const GITHUB_LINK_REGEX = /(https?:\/\/)?github\.com\/(?<author>[\w-]+)\/(?<repo>[\w-]+)\/?(tree\/)?(?<branch>[\w-]+)?/gm;
const GIT_REVISION_REGEX = /Delivery Revision: .*$/gm;

const GITHUB_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAwQzcuMTYgMCAwIDcuMTYgMCAxNkMwIDIzLjA4IDQuNTggMjkuMDYgMTAuOTQgMzEuMThDMTEuNzQgMzEuMzIgMTIuMDQgMzAuODQgMTIuMDQgMzAuNDJDMTIuMDQgMzAuMDQgMTIuMDIgMjguNzggMTIuMDIgMjcuNDRDOCAyOC4xOCA2Ljk2IDI2LjQ2IDYuNjQgMjUuNTZDNi40NiAyNS4xIDUuNjggMjMuNjggNSAyMy4zQzQuNDQgMjMgMy42NCAyMi4yNiA0Ljk4IDIyLjI0QzYuMjQgMjIuMjIgNy4xNCAyMy40IDcuNDQgMjMuODhDOC44OCAyNi4zIDExLjE4IDI1LjYyIDEyLjEgMjUuMkMxMi4yNCAyNC4xNiAxMi42NiAyMy40NiAxMy4xMiAyMy4wNkM5LjU2IDIyLjY2IDUuODQgMjEuMjggNS44NCAxNS4xNkM1Ljg0IDEzLjQyIDYuNDYgMTEuOTggNy40OCAxMC44NkM3LjMyIDEwLjQ2IDYuNzYgOC44MiA3LjY0IDYuNjJDNy42NCA2LjYyIDguOTggNi4yIDEyLjA0IDguMjZDMTMuMzIgNy45IDE0LjY4IDcuNzIgMTYuMDQgNy43MkMxNy40IDcuNzIgMTguNzYgNy45IDIwLjA0IDguMjZDMjMuMSA2LjE4IDI0LjQ0IDYuNjIgMjQuNDQgNi42MkMyNS4zMiA4LjgyIDI0Ljc2IDEwLjQ2IDI0LjYgMTAuODZDMjUuNjIgMTEuOTggMjYuMjQgMTMuNCAyNi4yNCAxNS4xNkMyNi4yNCAyMS4zIDIyLjUgMjIuNjYgMTguOTQgMjMuMDZDMTkuNTIgMjMuNTYgMjAuMDIgMjQuNTIgMjAuMDIgMjYuMDJDMjAuMDIgMjguMTYgMjAgMjkuODggMjAgMzAuNDJDMjAgMzAuODQgMjAuMyAzMS4zNCAyMS4xIDMxLjE4QzI3LjQyIDI5LjA2IDMyIDIzLjA2IDMyIDE2QzMyIDcuMTYgMjQuODQgMCAxNiAwVjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";
// https://www.svgrepo.com/svg/533325/code-branch
const GIT_BRANCH_IMAGE = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01LjUgOEM2Ljg4MDcxIDggOCA2Ljg4MDcxIDggNS41QzggNC4xMTkyOSA2Ljg4MDcxIDMgNS41IDNDNC4xMTkyOSAzIDMgNC4xMTkyOSAzIDUuNUMzIDYuODgwNzEgNC4xMTkyOSA4IDUuNSA4Wk01LjUgOFYxNk01LjUgMTZDNC4xMTkyOSAxNiAzIDE3LjExOTMgMyAxOC41QzMgMTkuODgwNyA0LjExOTI5IDIxIDUuNSAyMUM2Ljg4MDcxIDIxIDggMTkuODgwNyA4IDE4LjVDOCAxNy4xMTkzIDYuODgwNzEgMTYgNS41IDE2Wk0xOC41IDhDMTkuODgwNyA4IDIxIDYuODgwNzEgMjEgNS41QzIxIDQuMTE5MjkgMTkuODgwNyAzIDE4LjUgM0MxNy4xMTkzIDMgMTYgNC4xMTkyOSAxNiA1LjVDMTYgNi44ODA3MSAxNy4xMTkzIDggMTguNSA4Wk0xOC41IDhDMTguNSA4LjkyOTk3IDE4LjUgOS4zOTQ5NiAxOC4zOTc4IDkuNzc2NDZDMTguMTIwNCAxMC44MTE3IDE3LjMxMTcgMTEuNjIwNCAxNi4yNzY1IDExLjg5NzhDMTUuODk1IDEyIDE1LjQzIDEyIDE0LjUgMTJIOC41QzYuODQzMTUgMTIgNS41IDEzLjM0MzEgNS41IDE1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+Cg==";

function getBuildHistory() {
    return document.getElementById("jenkins-build-history");
}

function waitForElem(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function fetchFromGitHubLink(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

function parseGitHubLink(content) {
    return GITHUB_LINK_REGEX.exec(content)[0];
}

function parseGitRevision(content) {
    return GIT_REVISION_REGEX.exec(content)[0];
}

function createGitHubButton(githubLink) {
    const TASKS = document.querySelector("#tasks");
    const body = `<span class="task-link-wrapper ">
    <a href="${githubLink}" target="_blank" class="task-link task-link-no-confirm ">
    <span class="task-icon-link">
    <img src="${GITHUB_IMAGE}">
    </span>
    <span class="task-link-text">GitHub Link</span>
    </a>
    </span>`

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = body;

    TASKS.appendChild(taskDiv);
}

function createRevisionButton(githubLink, revision) {
    revision = revision.replace("Delivery Revision: ", "");

    const TASKS = document.querySelector("#tasks");
    const link = githubLink ? `href="${githubLink}/commit/${revision}" target="_blank"` : "";

    const body = `<span class="task-link-wrapper ">
    <a ${link} class="task-link task-link-no-confirm ">
    <span class="task-icon-link">
    <img src="${GIT_BRANCH_IMAGE}">
    </span>
    <span class="task-link-text" style="">Hash: ${revision.slice(0, 7)}</span>
    </a>
    </span>`

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = body;

    TASKS.appendChild(taskDiv);
}

async function addGitHubButton() {
    const buildHistory = getBuildHistory();

    if (!buildHistory)
        return;

    waitForElem("#jenkins-build-history > div > div > a").then((latestBuild) => {
        const consoleTextUrl = latestBuild.href + "Text";

        fetchFromGitHubLink(consoleTextUrl).then((content) => {
            let link = parseGitHubLink(content);

            if (link) {
                createGitHubButton(link);
            }

            let revision = parseGitRevision(content);

            if (revision) {
                createRevisionButton(link, revision);
            }
        });
    });
    return;

}

addGitHubButton();
