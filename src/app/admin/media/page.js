"use client";
import { useEffect, useState, useRef } from "react";
import { Upload, X, Trash2, Link as LinkIcon, Download } from "lucide-react";
import styles from "./MediaPage.module.css";
import AdminLayout from "@/components/AdminLayout";

export default function MediaPage() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setImages(data.files || []);
      }
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchImages();
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (fileName) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/media/${encodeURIComponent(fileName)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchImages();
      } else {
        alert("Failed to delete image");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting image");
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(window.location.origin + url);
    alert("Image URL copied!");
  };

  return (
    <AdminLayout
      title="Media Library"
      actions={
        <>
          <button
            className={styles.uploadBtn}
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
          >
            <Upload size={20} />
            {uploading ? "Uploading..." : "Upload New Image"}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpload}
            accept="image/*"
          />
        </>
      }
    >
      <div className={styles.grid}>
        {images.map((img, idx) => (
          <div key={idx} className={styles.card}>
            <div
              className={styles.imageWrapper}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.url} alt={img.name} className={styles.image} />
            </div>
            <div className={styles.details}>
              <span className={styles.name} title={img.name}>
                {img.name}
              </span>
              <div className={styles.actions}>
                <button
                  onClick={() => copyToClipboard(img.url)}
                  className={styles.iconBtn}
                  title="Copy Link"
                >
                  <LinkIcon size={16} />
                </button>
                <button
                  onClick={() => handleDelete(img.name)}
                  className={styles.iconBtn}
                  title="Delete"
                >
                  <Trash2 size={16} color="#ef4444" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className={styles.previewImage}
            />
            <div className={styles.previewDetails}>
              <p>
                <strong>URL:</strong>{" "}
                {window.location.origin + selectedImage.url}
              </p>
              <button
                className={styles.copyBtn}
                onClick={() => copyToClipboard(selectedImage.url)}
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
