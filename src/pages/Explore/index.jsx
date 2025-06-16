import React, { useState } from 'react';
import { Layout, Input, Card, List, Button, Row, Col, Typography, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const exploreNewData = [
  { id: 1, 
    singer: 'My Chemical Romance', 
    song: 'The World is Ugly', 
    img: 'https://i.scdn.co/image/ab67616d0000b273a67cf0d53d5f2170077e8ef5', 
    spotifyUrl: 'https://open.spotify.com/intl-id/track/6VtcgrVYo2xfygcWAfRpd1?si=389816b9c41f47d2' },
  { id: 2, 
    singer: 'Bring Me the Horizon', 
    song: 'Drown', 
    img: 'https://i.scdn.co/image/ab67616d0000b273413697269620e16f4466f543', 
    spotifyUrl: 'https://open.spotify.com/intl-id/track/6o39Ln9118FKTMbM4BvcEy?si=ebbd2223d02248c1' },
  { id: 3, 
    singer: 'The 1975', 
    song: 'About You', 
    img: 'https://i.scdn.co/image/ab67616d0000b2731f44db452a68e229650a302c', 
    spotifyUrl: 'https://open.spotify.com/intl-id/track/1fDFHXcykq4iw8Gg7s5hG9?si=a4b064aa7579497a ' },
  { id: 4, 
    singer: 'All Time Low', 
    song: 'Dear Maria, Count Me In', 
    img: 'https://i.scdn.co/image/ab67616d0000b273c8913cd7b91bb7f6bbbec305', 
    spotifyUrl: 'https://open.spotify.com/track/0JJP0IS4w0fJx01EcrfkDe?si=c42a310910844b1f' },
  { id: 5, 
    singer: 'The Red Jumpsuit Apparatus', 
    song: 'Face Down', 
    img: 'https://i.scdn.co/image/ab67616d0000b27319972c4a6318d040faa59aa5', 
    spotifyUrl: 'https://open.spotify.com/track/4wzjNqjKAKDU82e8uMhzmr?si=04eaa1e6341e4e90' },
  { id: 6, 
    singer: 'Blink-182', 
    song: 'I Miss You', 
    img: 'https://i.scdn.co/image/ab67616d0000b2730538b48c180256e0bdd8363f', 
    spotifyUrl: 'https://open.spotify.com/track/1oTo3ijRbaDAtrjJrGAPSw?si=8e498938c1314ec0' },
];

const popularData = [
  { id: 1, 
    title: 'back to friends', 
    duration: '3:19', 
    img: 'https://www.billboard.com/wp-content/uploads/2025/04/Sombr-cr-Bryce-Glenn-press-2025-billboard-1548.jpg?w=1024', 
    spotifyUrl: 'https://open.spotify.com/track/0FTmksd2dxiE5e3rWyJXs6?si=a866ea7e88ae4a42' 
  },
  { id: 2, 
    title: 'Kasih Aba Aba', 
    duration: '2:56', 
    img: 'https://i.scdn.co/image/ab67616d00001e02bc7eb81a2edb90625b3ffa50', 
    spotifyUrl: 'https://open.spotify.com/track/5rhwXZP0luMucnEPnYJpbI?si=54fdabe4446c4ce8' 
  },
  { id: 3, 
    title: 'Pendampingmu #Tahtahatiku', 
    duration: '4:04', 
    img: 'https://i.scdn.co/image/ab67616d00001e0209eb734c5185f151b097e05f', 
    spotifyUrl: 'https://open.spotify.com/track/0peDS2F3fH9U5YKSF9SZmm?si=903e8d4f5e054da5' 
  },
  { id: 4, 
    title: 'Mangu', 
    duration: '4:21', 
    img: 'https://i.scdn.co/image/ab67616d0000b273fecb2b49d97ed68528fbf44a', 
    spotifyUrl: 'https://open.spotify.com/track/4e6TmHCC4PRUj75knNplNP?si=41f226cc7faf43f9' 
  },
  { id: 5, 
    title: 'Tarot', 
    duration: '4:48', 
    img: 'https://i.scdn.co/image/ab67616d0000b273c800b90e2092a5328f699117', 
    spotifyUrl: 'https://open.spotify.com/track/4XHijJfABTtUCW3Bp6KFvr?si=76af30d1e6124887' 
  },
];

const moods = [
  { mood: 'Happy', playlistUrl: 'https://open.spotify.com/genre/0JQ5IMCbQBLtqe3T85WC6v' },
  { mood: 'Energetic', playlistUrl: 'https://open.spotify.com/genre/0JQ5IMCbQBLnfkcLJBREdX' },
  { mood: 'Party Breaker', playlistUrl: 'https://open.spotify.com/genre/0JQ5DAqbMKFA6SOHvT3gck' },
  { mood: 'Chill', playlistUrl: 'https://open.spotify.com/genre/0JQ5DAqbMKFFzDl7qN9Apr' }
];

const Explore = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const filteredExploreData = exploreNewData.filter((item) =>
    item.singer.toLowerCase().includes(searchText) || item.song.toLowerCase().includes(searchText)
  );

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff', color: '#000', width: '100%', margin: 0 }}>
      <Header style={{ backgroundColor: '#fff', padding: '0 24px', zIndex: 1, width: '100%' }}>
        <Row justify="center" align="middle" style={{ width: '100%' }}>
          <Col span={12}>
            <Search
              placeholder="Search music"
              allowClear
              bordered={false}
              style={{ width: '100%' }} // Membuat search bar menjadi lebar penuh
              onSearch={handleSearch}
            />
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '24px', overflowY: 'auto', maxWidth: '100%', margin: '0 auto', width: '100%' }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Explore new
        </Title>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 16, paddingBottom: 24, width: '100%' }}>
          {filteredExploreData.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{
                minWidth: 200,
                backgroundColor: '#f5f5f5',
                color: '#000',
                borderRadius: 8,
                flex: '0 0 auto',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
                maxWidth: '100%',
              }}
              cover={
                <img
                  alt={item.singer}
                  src={item.img}
                  style={{
                    borderRadius: '8px 8px 0 0',
                    height: 120,
                    objectFit: 'cover', // Membuat gambar tidak terdistorsi
                    width: '100%',
                  }}
                />
              }
              onClick={() => window.open(item.spotifyUrl, '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Meta
                title={<Text style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.song}</Text>}
                description={<Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.singer}</Text>}
              />
            </Card>
          ))}
        </div>

        <Row gutter={24}>
          <Col xs={24} md={16}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Popular
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={popularData}
              renderItem={(item, index) => (
                <List.Item
                  style={{ backgroundColor: '#f5f5f5', marginBottom: 8, borderRadius: 8, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                  actions={[<MoreOutlined key="more" style={{ color: '#aaa', fontSize: 18 }} />]}
                  onClick={() => window.open(item.spotifyUrl, '_blank')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <List.Item.Meta
                    avatar={<img src={item.img} alt={item.title} style={{ borderRadius: 4, width: 60, height: 60, objectFit: 'cover' }} />}
                    title={<Text>{index + 1}. {item.title}</Text>}
                  />
                  <div>
                    <Text>{item.duration}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col xs={24} md={8}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Mood
            </Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {moods.map((mood) => (
                <Button
                  key={mood.mood}
                  type="default"
                  style={{
                    width: '100%',
                    backgroundColor: '#f5f5f5',
                    color: '#000',
                    border: 'none',
                    height: 48,
                    fontWeight: 'bold',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onClick={() => window.open(mood.playlistUrl, '_blank')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {mood.mood}
                </Button>
              ))}
            </Space>
          </Col>
        </Row>
      </Content>
      <Footer style={{ backgroundColor: '#fff', padding: '0', display: 'none' }} />
    </Layout>
  );
};

export default Explore;
