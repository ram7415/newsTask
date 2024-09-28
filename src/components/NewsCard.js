import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function NewsCard() {
  const [newsInfo, setNewsInfo] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filterNews, setFilterNews] = useState('');

  const fetchNews = async () => {
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=tesla&from=2024-08-28&sortBy=publishedAt&apiKey=c6614ed02d474d368b259d36713bcbf8'
    );
    const json = await response.json();
    setNewsInfo(json.articles);
    setFilteredNews(json.articles); 
  };

  const handleSearch = () => {
    const updatedNews = newsInfo.filter(
      (news) => news.content && news.content.toLowerCase().includes(filterNews.toLowerCase())
    );
    setFilteredNews(updatedNews);
  };

  const onSearch = (e) => {
    setFilterNews(e.target.value);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className='p-[1px]'>
      <div className='my-3'>
        <input
          type='text'
          className='border border-black px-4 mx-1 rounded-md py-1 w-50'
          placeholder='Search news...'
          value={filterNews}
          onChange={onSearch}
        />
        <button className='bg-green-400 rounded-md px-2 py-1 w-15 hover:bg-green-500' onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className='flex flex-wrap gap-8 p-1'>
        {filteredNews.map((news, index) => (
          <div key={index} className='rounded-lg shadow shadow-gray-300'>
            <div className='w-50 h-100'>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant='top' className='h-40' src={news.urlToImage} />
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text>{news.content}</Card.Text>
                  <Button variant='primary'>Read More</Button>
                </Card.Body>
                <p>Date: {news.publishedAt}</p>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsCard;
