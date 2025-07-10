import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Image,
  Popconfirm,
  Tag,
  Tooltip,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { getData, sendData, deleteData } from "../../utils/api";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const GROUP_ID = 53;

const genreOptions = [
  { value: "music", label: "Music", color: "blue" },
  { value: "song", label: "Song", color: "green" },
  { value: "movie", label: "Movie", color: "red" },
  { value: "education", label: "Education", color: "orange" },
  { value: "others", label: "Others", color: "gray" },
];

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();

  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  useEffect(() => {
    getDataPlaylist();
  }, []);

  const getDataPlaylist = () => {
    console.log("Fetching playlist data...");
    getData(`/api/playlist/${GROUP_ID}`)
      .then((resp) => {
        console.log("Playlist data response:", resp);
        if (resp) {
          const playlistData = Array.isArray(resp) ? resp : resp.datas || resp.data || [];
          console.log("Setting playlists:", playlistData);
          
          // Debug: lihat struktur data setiap playlist
          if (playlistData.length > 0) {
            console.log("Sample playlist structure:", playlistData[0]);
            console.log("Available keys:", Object.keys(playlistData[0]));
          }
          
          setPlaylists(playlistData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        openNotificationWithIcon(
          "error",
          "Error",
          "Gagal mengambil data playlist"
        );
        setIsLoading(false);
      });
  };

  const handleSubmit = () => {
    let playName = form.getFieldValue("play_name");
    let playUrl = form.getFieldValue("play_url");
    let playThumbnail = form.getFieldValue("play_thumbnail");
    let playGenre = form.getFieldValue("play_genre");
    let playDescription = form.getFieldValue("play_description");

    let formData = new FormData();
    formData.append("play_name", playName);
    formData.append("play_url", playUrl);
    formData.append("play_thumbnail", playThumbnail);
    formData.append("play_genre", playGenre);
    formData.append("play_description", playDescription);

    let url = `/api/playlist/update/${idSelected}`;
    let msg = "Sukses memperbaharui playlist";

    sendData(url, formData)
      .then((resp) => {
        if (resp) {
          openNotificationWithIcon(
            "success",
            "Data berhasil disimpan",
            msg
          );
          setIsModalVisible(false);
          getDataPlaylist();
          onClose();
        } else {
          openNotificationWithIcon(
            "error",
            "Data playlist",
            "Data gagal dikirim"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Error",
          "Terjadi kesalahan saat menyimpan data"
        );
      });
  };

  const handleDelete = (id) => {
    console.log("Deleting playlist with ID:", id);
    console.log("Delete URL:", `/api/playlist/${id}`);
    
    deleteData(`/api/playlist/${id}`)
      .then((resp) => {
        console.log("Delete response:", resp);
        
        // Refresh data setelah delete berhasil
        getDataPlaylist();
        
        openNotificationWithIcon(
          "success",
          "Data berhasil dihapus",
          "Playlist berhasil dihapus"
        );
      })
      .catch((err) => {
        console.error("Delete error details:", err);
        
        // Tetap refresh data untuk melihat status terbaru
        getDataPlaylist();
        
        openNotificationWithIcon(
          "error",
          "Error",
          `Terjadi kesalahan saat menghapus data: ${err.message}`
        );
      });
  };

  const onClose = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
      setEditingPlaylist(null);
    }
    setIsModalVisible(false);
  };

  const handleEdit = (playlist) => {
    setIsModalVisible(true);
    setIsEdit(true);
    setIdSelected(playlist.id_play);
    setEditingPlaylist(playlist);
    form.setFieldsValue({
      play_name: playlist.play_name,
      play_url: playlist.play_url,
      play_thumbnail: playlist.play_thumbnail,
      play_genre: playlist.play_genre,
      play_description: playlist.play_description,
    });
  };

  const getGenreColor = (genre) => {
    const found = genreOptions.find((option) => option.value === genre);
    return found ? found.color : "default";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "-";
    }
  };

  return (
    <div className="layout-content">
      {contextHolder}
      <div className="mb-6">

        <div className="text-center mb-6">
          <Title level={2} className="mb-2">
            Playlist Management (Group ID: {GROUP_ID})
          </Title>
          <Text className="text-gray-600">
            Total: {playlists.length} playlist
          </Text>
        </div>
      </div>


      {isLoading ? (
        <Row gutter={[16, 16]}>
          {[...Array(6)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card loading={true} />
            </Col>
          ))}
        </Row>
      ) : (

        <Row gutter={[16, 16]}>
          {playlists.length === 0 ? (
            <Col span={24}>
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🎵</div>
                <Title level={3} className="text-gray-600 mb-2">
                  Belum Ada Playlist
                </Title>
                <Text className="text-gray-500">
                  Playlist akan muncul di sini setelah ditambahkan melalui API
                </Text>
              </div>
            </Col>
          ) : (
            playlists.map((playlist) => (
              <Col xs={24} sm={12} md={8} lg={6} key={playlist.id_play}>
                <Card
                  hoverable
                  cover={
                    <Image
                      alt={playlist.play_name}
                      src={playlist.play_thumbnail}
                      height={200}
                      style={{ objectFit: "cover" }}
                      fallback="/src/assets/images/logo.png"
                    />
                  }
                  actions={[
                    <div key="actions" className="flex justify-center items-center gap-4 py-2">
                      <Button
                        type="link"
                        icon={<LinkOutlined />}
                        onClick={() => window.open(playlist.play_url, "_blank")}
                        className="text-blue-600 hover:text-blue-800 px-3"
                        aria-label="Buka link playlist"
                        tabIndex={0}
                        size="small"
                      >
                        Buka
                      </Button>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(playlist)}
                        className="text-gray-600 hover:text-blue-600 px-3"
                        aria-label="Edit playlist"
                        tabIndex={0}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Hapus playlist ini?"
                        onConfirm={() => handleDelete(playlist.id_play)}
                        okText="Ya"
                        cancelText="Tidak"
                        placement="topRight"
                      >
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          className="text-gray-600 hover:text-red-600 px-3"
                          aria-label="Hapus playlist"
                          tabIndex={0}
                          size="small"
                        >
                          Hapus
                        </Button>
                      </Popconfirm>
                    </div>
                  ]}
                >
                  <Card.Meta
                    title={
                      <Text strong className="text-lg">
                        {playlist.play_name}
                      </Text>
                    }
                    description={
                      <div>
                        <Text ellipsis className="text-gray-600 mt-2 block mb-3">
                          {playlist.play_description}
                        </Text>
                        <div className="mb-3">
                          <Tag color={getGenreColor(playlist.play_genre)}>
                            {playlist.play_genre?.toUpperCase()}
                          </Tag>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div>
                            <Text strong>Dibuat: </Text>
                            <Text>{formatDate(playlist.created_at)}</Text>
                          </div>
                          <div>
                            <Text strong>Diupdate: </Text>
                            <Text>{formatDate(playlist.updated_at)}</Text>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}


      <Modal
        title="Edit Playlist"
        open={isModalVisible}
        onCancel={onClose}
        footer={<Button type="primary" onClick={() => handleSubmit()}>
          Update
        </Button>}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="play_name"
            label="Nama Playlist"
            rules={[
              { required: true, message: "Nama playlist harus diisi!" },
              { min: 3, message: "Nama playlist minimal 3 karakter!" },
            ]}
          >
            <Input
              placeholder="Masukkan nama playlist"
              size="large"
              maxLength={100}
            />
          </Form.Item>

          <Form.Item
            name="play_url"
            label="URL Playlist"
            rules={[
              { required: true, message: "URL playlist harus diisi!" },
              { type: "url", message: "Format URL tidak valid!" },
            ]}
          >
            <Input
              placeholder="https://example.com/playlist"
              size="large"
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            name="play_thumbnail"
            label="URL Thumbnail"
            rules={[
              { required: true, message: "URL thumbnail harus diisi!" },
              { type: "url", message: "Format URL tidak valid!" },
            ]}
          >
            <Input
              placeholder="https://example.com/image.jpg"
              size="large"
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            name="play_genre"
            label="Genre"
            rules={[{ required: true, message: "Genre harus dipilih!" }]}
          >
            <Select placeholder="Pilih genre" size="large">
              {genreOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  <Tag color={option.color}>{option.label}</Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="play_description"
            label="Deskripsi"
            rules={[
              { required: true, message: "Deskripsi harus diisi!" },
              { min: 10, message: "Deskripsi minimal 10 karakter!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Masukkan deskripsi playlist"
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Playlist;
