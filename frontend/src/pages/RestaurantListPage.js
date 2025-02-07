import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');
  const [averageSpend, setAverageSpend] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Fetch all restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/restaurants');
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (averageSpend) params.append('average_spend', averageSpend);
      if (cuisine) params.append('cuisine', cuisine);
      if (searchQuery) params.append('search_query', searchQuery);
      if (latitude) params.append('latitude', latitude);
      if (longitude) params.append('longitude', longitude);

      const response = await fetch(`http://127.0.0.1:5000/search-restaurants?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error searching restaurants:', error);
    }
  };

  return (
    <Container>
      <Header>Restaurant List</Header>

      <FiltersContainer>
        <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name" />
        <Input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Filter by Country Code" />
        <Input type="text" value={averageSpend} onChange={(e) => setAverageSpend(e.target.value)} placeholder="Average Spend for Two" />
        <Input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="Filter by Cuisine" />
        <Input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Enter Latitude" />
        <Input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Enter Longitude" />
        <Button onClick={handleSearch}>Apply Filters</Button>
      </FiltersContainer>

      <RestaurantCards>
        {restaurants.length === 0 && <p>No results found.</p>}
        {restaurants.map((restaurant) => (
          <Card key={restaurant.restaurant_id}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.cuisines} | ${restaurant.average_cost} for two</p>
            <a href={`/restaurant/${restaurant.restaurant_id}`} className="link">View Details</a>
          </Card>
        ))}
      </RestaurantCards>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
  max-width: 100%;
  margin: auto;
  background: linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%);
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #555;
  background: #333;
  color: #fff;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #187bcd;
  }
`;

const RestaurantCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Card = styled.div`
  background-color: #242424;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  }

  h3 {
    font-size: 1.2rem;
    color: #e0e0e0;
  }

  p {
    color: #cccccc;
    margin-bottom: 10px;
  }

  .link {
    color: #1e90ff;
    text-decoration: none;
    font-weight: bold;
  }

  .link:hover {
    text-decoration: underline;
  }
`;

export default RestaurantListPage;