;; SPDX-License-Identifier: AGPL-3.0-or-later
;; SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell
;; ECOSYSTEM.scm — blue-screen-of-app

(ecosystem
  (version "1.0.0")
  (name "blue-screen-of-app")
  (type "project")
  (purpose "_Does exactly what it says on the tin... or screen._")

  (position-in-ecosystem
    "Part of hyperpolymath ecosystem. Follows RSR guidelines.")

  (related-projects
    (project (name "rhodium-standard-repositories")
             (url "https://github.com/hyperpolymath/rhodium-standard-repositories")
             (relationship "standard")))

  (what-this-is "_Does exactly what it says on the tin... or screen._")
  (what-this-is-not "- NOT exempt from RSR compliance"))
