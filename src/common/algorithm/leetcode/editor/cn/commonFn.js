import React, { useRef, useEffect, useState } from 'react';

const DEFAULT_IMAGE = '';
const LazyImage = ({ src, alt }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (<img
    ref={imgRef}
    src={isIntersecting ? src : DEFAULT_IMAGE}
    alt={alt}
    style={{ opacity: isIntersecting ? 1 : 0, transition: 'opacity 0.5s' }}
  />);
};

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    // 模拟获取图片数据的异步操作
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`https://example.com/api/images?page=${page}`);
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data]);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && window.innerHeight + window.scrollY >= containerRef.current.offsetHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (<div ref={containerRef}>
    {images.map((image, index) => (<LazyImage key={index} src={image.src} alt={image.alt} />))}
    {isLoading && <div>Loading...</div>}
  </div>);
};

const VirtualList = ({ itemCount, itemHeight, renderItem }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10); // 初始值为可见区域内的列表项数量
  const containerRef = useRef();

  const handleScroll = () => {
    const { scrollTop, clientHeight } = containerRef.current;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(itemCount, start + Math.ceil(clientHeight / itemHeight) + 1); // 加 1 以提前渲染

    setStartIndex(start);
    setEndIndex(end);
  };

  useEffect(() => {
    containerRef.current.addEventListener('scroll', handleScroll);
    return () => containerRef.current.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleItems = new Array(endIndex - startIndex).fill().map((_, index) => startIndex + index);

  return (<div ref={containerRef} style={{ overflowY: 'auto', height: '400px' }}>
    <div style={{ height: `${itemCount * itemHeight}px`, position: 'relative' }}>
      {visibleItems.map(index => renderItem(index))}
    </div>
  </div>);
};
