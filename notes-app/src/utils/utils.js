/**
 * Sets a new offset position for a card based on the mouse movement direction.
 * Ensures the card does not move out of the viewport bounds.
 *
 * @param {HTMLElement} card - The card element.
 * @param {Object} mouseMoveDir - The direction of mouse movement with x and y properties.
 * @returns {Object} The new offset position with x and y properties.
 */
export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: Math.max(0, offsetLeft),
    y: Math.max(0, offsetTop),
  };
};

/**
 * Automatically adjusts the height of a textarea to fit its content.
 *
 * @param {Object} textAreaRef - The ref object of the textarea.
 */
export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;

  if (current) {
    current.style.height = "auto";
    current.style.height = `${current.scrollHeight}px`;
    if (current.parentNode) {
      current.parentNode.style.height = `${current.scrollHeight}px`;
    }
  }
};

/**
 * Sets the z-index of the selected card to a higher value to bring it to the front.
 * Decreases the z-index of all other cards.
 *
 * @param {HTMLElement} selectedCard - The card element to bring to the front.
 */
export const setZIndex = (selectedCard) => {
  if (selectedCard) {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
      if (card !== selectedCard) {
        card.style.zIndex = parseInt(selectedCard.style.zIndex, 10) - 1;
      }
    });
  }
};

export function bodyParser(value) {
  try {
    JSON.parse(value);
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}
