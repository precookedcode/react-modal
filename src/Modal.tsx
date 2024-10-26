import React, { useState, useEffect, useCallback, useRef } from "react";
import { IconButton } from "@precooked/react-icon-button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    backdropStyles?: React.CSSProperties; // Estilos del fondo
    windowStyles?: React.CSSProperties; // Estilos de la ventana
    closeButtonStyles?: React.CSSProperties; // Estilos del botón de cierre
    closeIcon?: string; // Icono del botón de cierre
    closeIconPaths?: any[]; // Paths para el DynamicIcon si es necesario
    closeIconSize?: number; // Tamaño del icono del botón de cierre
    zIndex?: number; // Tambien se puede llamar stackOrder
    id?: string;
    fullScreen?: boolean; // Ocupar toda la pantalla
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    backdropStyles,
    windowStyles,
    closeButtonStyles,
    closeIcon = "close",
    closeIconPaths,
    closeIconSize = 24,
    zIndex = 999,
    id,
    fullScreen = false,
}) => {
    const [isVisible, setIsVisible] = useState(isOpen);
    const modalBackgroundRef = useRef<HTMLDivElement>(null);
    const modalWindowRef = useRef<HTMLDivElement>(null);

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.addEventListener("keydown", handleKeyPress);
        } else {
            document.removeEventListener("keydown", handleKeyPress);
        }
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [isOpen, handleKeyPress]);

    // Animaciones de apertura y cierre con JavaScript
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (modalBackgroundRef.current && modalWindowRef.current) {
                    modalBackgroundRef.current.style.opacity = "1";
                    modalWindowRef.current.style.transform = "translateY(0)";
                }
            }, 50); // Pequeño retraso para la transición
        } else {
            if (modalBackgroundRef.current && modalWindowRef.current) {
                modalBackgroundRef.current.style.opacity = "0";
                modalWindowRef.current.style.transform = "translateY(100%)";
                setTimeout(() => setIsVisible(false), 300); // Tiempo de la animación para ocultar
            }
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div
            ref={modalBackgroundRef}
            {...(id ? { id } : {})}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0, // Inicialmente transparente
                transition: "opacity 0.3s ease-in-out", // Animación de fondo
                paddingRight: 15,
                paddingLeft: 15,
                boxSizing: "border-box",
                zIndex: zIndex,
                ...backdropStyles,
            }}
            onClick={onClose} // Cierra el modal si se hace clic en el fondo
        >
            <div
                ref={modalWindowRef}
                style={{
                    position: "relative",
                    backgroundColor: "#fff", // Fondo blanco de la ventana
                    borderRadius: fullScreen ? "0px" : "8px", // Sin borde redondeado si es pantalla completa
                    padding: fullScreen ? "0" : "20px", // Sin padding si es pantalla completa
                    maxWidth: fullScreen ? "100%" : "500px", // Ancho total si es pantalla completa
                    width: fullScreen ? "100%" : "90%",
                    height: fullScreen ? "100%" : "auto", // Alto total si es pantalla completa
                    boxShadow: fullScreen ? "none" : "0px 5px 15px rgba(0, 0, 0, 0.3)", // Sin sombra si es pantalla completa
                    transform: "translateY(100%)", // Empieza desde abajo
                    transition: "transform 0.3s ease-in-out", // Animación de la ventana
                    minHeight: fullScreen ? "100%" : "80%",
                    ...windowStyles,
                }}
                onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic en el contenido
            >
                {/* Botón de cierre */}
                <IconButton
                    onClick={onClose}
                    icon={closeIcon}
                    iconPaths={closeIconPaths}
                    iconSize={closeIconSize}
                    type="clear"
                    hasShadow={false}
                    color="text"
                    styles={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 1,
                        ...closeButtonStyles,
                    }}
                />
                <div
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden",
                        position: "absolute",
                        top: "0px",
                        left: "10px",
                        right: "10px",
                        bottom: "0px",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
