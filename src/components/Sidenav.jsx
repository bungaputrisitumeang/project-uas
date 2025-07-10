/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Menu, Button, notification } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { sendData } from "../utils/api.js";
// Membersihkan import yang tidak digunakan
import {
  FileImageOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function Sidenav({ color }) {
  // State management yang lebih baik, dipertahankan dari kode baru Anda
  const [selectedKey, setSelectedKey] = useState(window.location.pathname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  // 2. (Opsional tapi sangat direkomendasikan) State untuk loading
  const [isLoading, setIsLoading] = useState(false);
  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  // Struktur mainMenuItems ini sengaja dipertahankan persis seperti kode lama
  const mainMenuItems = [
    { key: "1", label: "APP", className: "menu-item-header" },
    {
      key: "/explore",
      label: (
        <NavLink to="/explore" onClick={() => handleMenuClick("/explore")}>
          <span className="icon" style={{ backgroundColor: selectedKey === "/explore" ? "#3674B5" : "" }}>
            {dashboard}
          </span>
          <span className="label">Explore</span>
        </NavLink>
      ),
    },
    { key: "2", label: "Personal", className: "menu-item-header" },
    {
      key: "/Albums",
      label: (
        <NavLink to="/Albums" onClick={() => handleMenuClick("/Albums")}>
          <span className="icon" style={{ backgroundColor: selectedKey === "/Albums" ? "#3674B5" : "" }}>
            <ShoppingCartOutlined />
          </span>
          <span className="label">Albums</span>
        </NavLink>
      ),
    },
    {
      key: "/Playlists",
      label: (
        <NavLink to="/Playlists" onClick={() => handleMenuClick("/Playlists")}>
          <span className="icon" style={{ backgroundColor: selectedKey === "/Playlists" ? "#3674B5" : "" }}>
            <UnorderedListOutlined />
          </span>
          <span className="label">Playlists</span>
        </NavLink>
      ),
    },
  ];

  const handleCreatePlaylistClick = () => {
    setIsModalOpen(true);
  };
  // Fungsi yang dijalankan setelah playlist BERHASIL dibuat di modal
  const handlePlaylistCreated = async (values) => {
    console.log("Data siap dikirim:", values);
    setIsLoading(true);
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      const groupId = '53';
      const endpoint = `/api/playlist/${groupId}`;
      
      console.log('FormData yang akan dikirim:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      const response = await sendData(endpoint, formData);

      console.log('Server response:', response);

      // Ganti alert() dengan notifikasi sukses
      api.success({
        message: 'Playlist Created',
        description: 'Your new playlist has been successfully created.',
        placement: 'topRight',
      });

      setIsModalOpen(false);

    } catch (error) {
      console.error('Gagal mengirim data playlist:', error);

      // Ganti alert() dengan notifikasi error
      api.error({
        message: 'Creation Failed',
        description: `Failed to create the playlist. Error: ${error.message}`,
        placement: 'topRight',
      });

    } finally {
      setIsLoading(false);
    }
  };




  const handleModalClose = () => {
    // Jangan tutup modal jika sedang dalam proses loading
    if (!isLoading) {
      setIsModalOpen(false);
    }
  };


  // PERBAIKAN: Struktur tombol diperbaiki dan onClick ditambahkan
  const createPlaylistItem = (
    <Button
      type="primary"
      shape="round"
      icon={<PlusOutlined />}
      // Handler klik tetap sama
      onClick={handleCreatePlaylistClick}
      className="inline-flex items-center justify-center 
                 shadow-lg hover:shadow-xl hover:-translate-y-1"
      style={{
        height: 'auto', // Biarkan tinggi menyesuaikan padding
        padding: '6px 12px', // Atur padding secara manual
        fontSize: '16px', // Atur ukuran font
        backgroundColor: '#3674B5', // Warna custom Anda
        borderColor: '#3674B5', // Samakan warna border
      }}
    >
      Create Playlist
    </Button>
  );



  return (
    <>
      {contextHolder} 
      <div className="brand">
        <span>WebfmSI.com</span>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 77px)",
        }}
      >
        <Menu
          theme="light"
          mode="inline"
          items={mainMenuItems}
        />
        <div style={{ marginTop: "auto", padding: "24px", textAlign: "center" }}>
          {createPlaylistItem}
        </div>
      </div>
      <CreatePlaylistModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handlePlaylistCreated}
        confirmLoading={isLoading}
      />
    </>
  );
}

export default Sidenav;