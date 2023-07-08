export const setupSwipeScroll = element => {
    let isScrolling = false;
    let startX;
    let scrollLeft;
  
    element.addEventListener('mousedown', handleSwipeStart);
    element.addEventListener('touchstart', handleSwipeStart);
  
    element.addEventListener('mousemove', handleSwipeMove);
    element.addEventListener('touchmove', handleSwipeMove);
  
    element.addEventListener('mouseup', handleSwipeEnd);
    element.addEventListener('touchend', handleSwipeEnd);
  
    function handleSwipeStart(event) {
      if (event.type === 'mousedown') {
        startX = event.pageX;
      } else if (event.type === 'touchstart') {
        startX = event.touches[0].pageX;
      }
      scrollLeft = element.scrollLeft;
      isScrolling = true;
    }
  
    function handleSwipeMove(event) {
      if (!isScrolling) return;
  
      event.preventDefault();
  
      let x;
      if (event.type === 'mousemove') {
        x = event.pageX;
      } else if (event.type === 'touchmove') {
        x = event.touches[0].pageX;
      }
  
      const scrollOffset = startX - x;
      element.scrollLeft = scrollLeft + scrollOffset;
    }
  
    function handleSwipeEnd() {
      isScrolling = false;
    }
  }