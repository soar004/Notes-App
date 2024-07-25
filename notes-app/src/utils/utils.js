export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: Math.max(0, offsetLeft),
    y: Math.max(0, offsetTop),
  };
};

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

export const bodyParser = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
