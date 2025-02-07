import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/restaurant/${id}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  return restaurant ? (
    <Container>
      <DetailCard>
        <h2>{restaurant.name}</h2>
        <p>
          <strong>Address:</strong> {restaurant.address}
        </p>
        <p>
          <strong>Cuisine:</strong> {restaurant.cuisines}
        </p>
        <p>
          <strong>Average Cost for Two:</strong> ${restaurant.average_cost}
        </p>
        <p>
          <strong>Rating:</strong> {restaurant.aggregate_rating}/5
        </p>
      </DetailCard>
    </Container>
  ) : (
    <div>Loading...</div>
  );
};

// Dark Mode Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%);
  padding: 40px;
  color: #e0e0e0;
`;

const DetailCard = styled.div`
  background: #242424;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 100%;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.7);
  }

  h2 {
    font-size: 2.5rem;
    color: #e0e0e0;
    margin-bottom: 20px;
    border-bottom: 2px solid #444;
    padding-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: #cccccc;
    margin-bottom: 15px;
    line-height: 1.6;
  }

  strong {
    color: #ffffff;
  }
`;

export default RestaurantDetailPage;
