# F2U Base Directory

A searchable, community-friendly directory of free-to-use (F2U)
character bases and templates. Browse the collection, search by creator
or tags, filter by category and usage permissions, and open individual
listings for more information.

> **Please read the original creator's terms before using any base.**
> Permission labels in this directory are generalized summaries, not a
> replacement for the creator's own rules.

## Features

-   **Searchable directory** --- search creators, tags, permissions,
    base types, and platforms.
-   **Filters** --- narrow listings by category, permission, type,
    platform, and preview availability.
-   **Sorting** --- browse listings using the available sorting options.
-   **Gallery and detail views** --- view previews in the gallery and
    open a listing for details and source links.
-   **Responsive layout** --- usable on desktop, tablet, and mobile.
-   **Community submissions** --- submit a listing for review.
    Submissions are not published automatically.

## Visit the site

Tthe site will be available at:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`



## Getting started

### Browse the directory

1.  Open the GitHub Pages website.
2.  Use the search field to find a creator, tag, or keyword.
3.  Apply filters to narrow the results.
4.  Select a listing to view its details and follow the source links.
5.  Check the original creator's page and terms before using a base.

### Run locally

1.  Download or clone this repository.
2.  Open `index.html` in a browser.

For the most reliable local testing, serve the repository through a
local development server rather than opening the file directly. No build
step is required.

## Deploy with GitHub Pages

1.  Create a GitHub repository.
2.  Upload the contents of this project to the repository's root
    directory. Make sure `index.html`, `styles.css`, `app.js`,
    `config.js`, and `data.json` are at the top level.
3.  Open the repository's **Settings**.
4.  Select **Pages**.
5.  Under **Build and deployment**, choose **Deploy from a branch**.
6.  Select the `main` branch and the `/ (root)` folder, then save.
7.  Wait for GitHub Pages to publish the site. The published URL will
    appear in the Pages settings.

## Directory data

By default, the site uses `data.json`. The included file is a snapshot
of the directory data exported from the spreadsheet.

Each entry can include:

  Field           Description
  --------------- -------------------------------------------------
  `id`            Unique listing identifier
  `label`         Listing label or credited name used for display
  `credit`        Credited creator
  `creator`       Creator name
  `permission`    Generalized usage permission
  `type`          Base type
  `tags`          Searchable tags
  `categories`    Directory categories
  `preview`       Preview image URL
  `site`          Platform where the listing is hosted
  `link`          Original listing URL
  `creatorLink`   Creator profile URL
  `source`        Source tab or dataset label

The source spreadsheet does not provide a separate title/name field for
every base. The site therefore uses the available credited/listing name
rather than inventing a base title.


### Community submission review

Submissions are sent to the spreadsheet's `Submissions` sheet and marked
**Pending review**. Review each submission and verify its source and
permissions before adding it to the public `Data` directory. The form
does not automatically publish submissions.

## Usage and permissions

Permission labels help visitors filter listings. They may summarize or
simplify the original creator's rules and may not include every
restriction.

Before using a base:

-   Visit the original listing and read the creator's current terms.
-   Follow the creator's requirements for credit, editing,
    redistribution, commercial use, and other restrictions.
-   Do not assume a directory label grants permission beyond what the
    creator explicitly allows.
-   Contact the creator if their terms are unclear.

The directory is an index and discovery tool. It does not claim
ownership of listed bases, artwork, previews, or creator materials.
Rights remain with their respective creators.

## Project files

  -----------------------------------------------------------------------
  File                                Purpose
  ----------------------------------- -----------------------------------
  `index.html`                        Main website page

  `styles.css`                        Layout, styling, and responsive
                                      rules

  `app.js`                            Search, filters, sorting, gallery,
                                      and detail view

  `config.js`                         Site configuration, API URL, and
                                      page size

  `data.json`                         Static directory data snapshot

  `google-apps-script.gs`             Optional Google Sheets API and
                                      submission handler

  `README.md`                         Project documentation
  -----------------------------------------------------------------------

## Help and issues

For website bugs, broken features, or suggestions, open an issue in this
GitHub repository.

For questions about a specific base's usage rights, contact the original
creator through the listing or creator profile. The directory maintainer
cannot grant permission on another creator's behalf.

## Contributions

Contributions that improve the directory, fix bugs, or improve
accessibility are welcome.

Before submitting a change:

1.  Explain what the change does and why it is useful.
2.  Keep the site compatible with GitHub Pages static hosting.
3.  Avoid adding private or personally identifying information to public
    data.
4.  For new base listings, include the original source link and accurate
    creator/permission information.
5.  Do not submit someone else's work without a reliable source and
    appropriate attribution.

Community submissions received through the website are reviewed before
being added to the public directory.

## Maintainer

Maintained by the F2U Base Directory project owner. Listing creators
retain ownership of their respective work.

## License and Copyright

The website's original source code is licensed under the MIT License. This license does not apply to third-party artwork, character bases, preview images, or creator materials linked or displayed by this directory. Such materials remain the property of their respective creators and are subject to their individual usage terms. Please consult the original creator before using any listed material.

------------------------------------------------------------------------

If you find a listing with incorrect information or a broken link,
report it through the repository's issue tracker or the site's
submission/contact method.

