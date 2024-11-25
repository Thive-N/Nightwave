import React from 'react';

export const fetchFeeds = async () => {
  try {
    const response = await fetch(`/api/rss/updateSubscriptions`, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Failed to fetch feeds: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching feeds:', error);
    throw error;
  }
};

export const applyChanges = async (toggledfeeds: string[]) => {
  const res = await fetch('/api/rss/updateSubscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscriptions: toggledfeeds }),
  });

  if (!res.ok) {
    console.error('Failed to update subscriptions');
  } else {
    console.log('Subscriptions updated successfully');
  }
};
