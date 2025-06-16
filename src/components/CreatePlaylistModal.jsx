import React from 'react';
import PropTypes from 'prop-types';
// 1. Impor Row dan Col dari antd
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;

const genreOptions = [
    { value: 'music', label: 'Music' },
    { value: 'song', label: 'Song' },
    { value: 'movie', label: 'Movie' },
    { value: 'education', label: 'Education' },
    { value: 'others', label: 'Others' },
];
  

function CreatePlaylistModal({ open, onClose, onSuccess, confirmLoading }) {
    const [form] = Form.useForm();
    const [previewImageUrl, setPreviewImageUrl] = useState('');

    const onFinish = (values) => {
        onSuccess(values);
        form.resetFields();
        setPreviewImageUrl('');
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        onClose();
        form.resetFields();
        setPreviewImageUrl('');
    };

    const handleThumbnailUrlChange = (e) => {
        setPreviewImageUrl(e.target.value);
    };

    // Fungsi untuk menangani jika gambar gagal dimuat
    const handleImageError = (e) => {
        e.target.onerror = null; // Mencegah loop error jika gambar placeholder juga gagal
        e.target.src = "https://placehold.co/600x400?text=Image+Not+Found"; // Ganti dengan gambar placeholder
    }

    return (
        <Modal
            title="Create New Playlist"
            // 2. Buat modal lebih lebar
            width={720}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Create"
            cancelText="Cancel"
            confirmLoading={confirmLoading}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                name="create_playlist_form_in_modal"
            >
                {/* 3. Gunakan Row dan Col untuk layout 2 kolom */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="play_name"
                            label="Playlist Name"
                            rules={[{ required: true, message: 'Please input the playlist name!' }]}
                        >
                            <Input placeholder="Enter playlist name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="play_url"
                            label="Playlist URL"
                            rules={[{ required: true, message: 'Please input the URL!' }, { type: 'url', message: 'Please enter a valid URL!' }]}
                        >
                            <Input placeholder="https://example.com/playlist" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="play_thumbnail"
                            label="Thumbnail URL"
                            rules={[{ required: true, message: 'Please input the thumbnail URL!' }, { type: 'url', message: 'Please enter a valid URL!' }]}
                        >
                            {/* 3. Tambahkan onChange pada Input thumbnail */}
                            <Input
                                placeholder="https://example.com/image.jpg"
                                onChange={handleThumbnailUrlChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {/* 3. Ganti Input dengan Select di sini */}
                        <Form.Item
                            name="play_genre"
                            label="Genre"
                            rules={[{ required: true, message: 'Please select a genre!' }]}
                        >
                            <Select
                                placeholder="Select a genre"
                                options={genreOptions}
                                allowClear // Menambahkan tombol 'x' untuk menghapus pilihan
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 4. Tampilkan preview gambar secara kondisional di sini */}
                {previewImageUrl && (
                    <div className="mb-4">
                        <p className="mb-2 font-semibold text-gray-600">Image Preview:</p>
                        <img
                            src={previewImageUrl}
                            alt="Thumbnail Preview"
                            className="w-full max-h-48 rounded-lg object-cover border"
                            onError={handleImageError}
                        />
                    </div>
                )}

                {/* Deskripsi menggunakan lebar penuh */}
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="play_description"
                            label="Description"
                        >
                            <TextArea rows={4} placeholder="A short description about this playlist" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

// ... (kode PropTypes tetap sama) ...
CreatePlaylistModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    confirmLoading: PropTypes.bool,
};

CreatePlaylistModal.defaultProps = {
    confirmLoading: false,
};

export default CreatePlaylistModal;