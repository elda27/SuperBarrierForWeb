export function filterAmazon(document: Document, url: URL): Promise<void> {
  return new Promise<void>((resolve) => {
    try {
      if (url.searchParams.has("content-id")) {
        _filterContentPage(document);
      } else {
        _filterReviewPage(document);
      }
    } catch (e) {
      resolve();
    }
  });
}

export function _filterContentPage(document: Document) {
  _filterAverageCustomerReviewsOnContentPage(document);
}

function _filterIcons(document: Document): void {
  const smallStarChildren = document.getElementsByClassName("a-icon-star");
  for (let i = 0; i < smallStarChildren.length; ++i) {
    smallStarChildren[i].setAttribute("class", "a-icon a-icon-star a-start-5");
  }

  const mediumStarChildren =
    document.getElementsByClassName("a-icon-star-medium");
  for (let i = 0; i < mediumStarChildren.length; ++i) {
    const attr = mediumStarChildren[i].getAttribute("class");
    mediumStarChildren[i].setAttribute(
      "class",
      attr?.replace(/a-star-medium[^\s]*/, "a-star-medium-5") ?? ""
    );
  }
}

/**
 * Filtering customer reviews part
 * @param document HTML document object
 */
export function _filterAverageCustomerReviewsOnContentPage(
  document: Document
): void {
  // Filtering icons
  _filterIcons(document);

  // Filtering table
  const tableRows = document.querySelectorAll("#histogramTable tr");
  if (!tableRows) {
    return;
  }
  // Filtering review content
  // If the best review will be 100% votes and other reviews will be 0% votes.
  for (let i = 0; i < tableRows.length; ++i) {
    const row = tableRows[i];
    row.setAttribute(
      "aria-label",
      row.getAttribute("aria-label")?.replace(/\d+%/, i == 0 ? "100%" : "0%") ??
        ""
    );

    // search anchor elements in the table row
    const anchors = row.getElementsByTagName("a");
    for (let j = 0; j < anchors.length; ++j) {
      const anchor = anchors[j];
      // Replace aria-label
      anchor.setAttribute(
        "aria-label",
        anchor
          .getAttribute("aria-label")
          ?.replace(/\d+%/, i == 0 ? "100%" : "0%") ?? ""
      );
      // Filtering meter-bar width
      const meterBar = anchor.querySelector(".a-meter-bar");
      meterBar?.setAttribute("style", i == 0 ? "width: 100%;" : "width: 0%;");

      // Filtering percentile of the text
      if (anchor.innerText.match(/\d+%/)) {
        anchor.innerText = i == 0 ? "100%" : "0%";
      }
    }
  }

  // Filtering average rating
  const averageRating = document.querySelector(
    "[data-hook=rating-out-of-text]"
  );
  if (averageRating?.textContent) {
    averageRating.textContent = averageRating.textContent.replace(
      /\d(\.\d)?/g,
      "5"
    );
  }
}

/**
 *
 * @param document HTML document object
 */
export function _filterReviewPage(document: Document) {
  const icons = document.querySelectorAll(".a-icon");
  for (let i = 0; i < icons.length; ++i) {
    const icon = icons[i];
    const iconAttr = icon.getAttribute("class");

    if (iconAttr?.match(/a-star-small[^\s]*/)) {
      icon.setAttribute(
        "class",
        iconAttr?.replace(/a-star-small[^s]/, "a-star-small-5") ?? ""
      );
      icon.childNodes[0].textContent =
        iconAttr?.replace(/\d(\.\d)?/g, "5") ?? "";
      const averageScore =
        icon.parentNode?.parentNode?.nextSibling?.nextSibling;
      if (averageScore) {
        averageScore.textContent =
          averageScore.textContent?.replace(/\d(\.\d)?/g, "5.0") ?? "";
      }
    }
  }
}
