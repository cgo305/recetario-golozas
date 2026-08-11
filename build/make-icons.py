#!/usr/bin/env python3
"""Genera los iconos PNG del recetario sin dependencias externas.

Dibuja un cuadrado de esquinas redondeadas en el color primario con una
"G" encima. Usa supersampling para que los bordes queden suaves.

    python3 build/make-icons.py

Vuelve a ejecutarlo si cambias los colores de la marca.
"""

import math
import os
import struct
import zlib

FONDO = (0x72, 0x30, 0x1C)      # primary
TINTA = (0xFA, 0xF9, 0xF4)      # surface
DESTINO = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'icons')

SS = 4  # muestras por lado para el antialiasing


def dentro_cuadrado_redondeado(x, y, lado, radio):
    if radio <= 0:
        return True
    for cx, cy in ((radio, radio), (lado - radio, radio),
                   (radio, lado - radio), (lado - radio, lado - radio)):
        # solo importa si el punto cae en la esquina correspondiente
        if (x < radio or x > lado - radio) and (y < radio or y > lado - radio):
            if abs(x - cx) <= radio and abs(y - cy) <= radio:
                if (x - cx) ** 2 + (y - cy) ** 2 <= radio ** 2:
                    return True
        else:
            return True
    return False


def dentro_g(x, y, lado):
    """Una 'G': anillo grueso abierto a la derecha, más la barra central."""
    cx = cy = lado / 2.0
    R = lado * 0.30          # radio exterior del anillo
    grosor = lado * 0.088
    r = R - grosor

    dx, dy = x - cx, y - cy
    dist = math.hypot(dx, dy)
    ang = math.degrees(math.atan2(dy, dx))   # 0 = derecha, crece hacia abajo

    # Anillo, salvo el hueco de la derecha (entre -38° y +8°)
    if r <= dist <= R and not (-38.0 <= ang <= 8.0):
        return True

    # Barra horizontal del centro hacia la derecha
    if (cx - grosor * 0.2) <= x <= (cx + R) and abs(y - cy) <= grosor / 2.0:
        return True

    # Remate vertical al final de la barra, hacia arriba
    if (cx + R - grosor) <= x <= (cx + R) and (cy - R * 0.42) <= y <= cy:
        return True

    return False


def construir(lado, maskable=False):
    radio = 0 if maskable else lado * 0.22
    escala = 0.72 if maskable else 1.0   # deja zona segura en el maskable
    desplazamiento = lado * (1 - escala) / 2

    filas = bytearray()
    for py in range(lado):
        filas.append(0)  # tipo de filtro PNG: ninguno
        for px in range(lado):
            acumulado = [0.0, 0.0, 0.0, 0.0]
            for sy in range(SS):
                for sx in range(SS):
                    x = px + (sx + 0.5) / SS
                    y = py + (sy + 0.5) / SS
                    if not dentro_cuadrado_redondeado(x, y, lado, radio):
                        continue
                    gx = (x - desplazamiento) / escala
                    gy = (y - desplazamiento) / escala
                    color = TINTA if dentro_g(gx, gy, lado) else FONDO
                    acumulado[0] += color[0]
                    acumulado[1] += color[1]
                    acumulado[2] += color[2]
                    acumulado[3] += 255
            n = SS * SS
            a = acumulado[3] / n
            if a < 0.5:
                filas.extend((0, 0, 0, 0))
            else:
                # se des-premultiplica para conservar el color en los bordes
                k = acumulado[3] / 255.0
                filas.extend((
                    int(round(acumulado[0] / k)),
                    int(round(acumulado[1] / k)),
                    int(round(acumulado[2] / k)),
                    int(round(a)),
                ))
    return bytes(filas)


def escribir_png(ruta, lado, datos):
    def trozo(tipo, contenido):
        c = tipo + contenido
        return struct.pack('>I', len(contenido)) + c + struct.pack('>I', zlib.crc32(c) & 0xFFFFFFFF)

    cabecera = struct.pack('>IIBBBBB', lado, lado, 8, 6, 0, 0, 0)  # RGBA 8 bits
    png = (b'\x89PNG\r\n\x1a\n'
           + trozo(b'IHDR', cabecera)
           + trozo(b'IDAT', zlib.compress(datos, 9))
           + trozo(b'IEND', b''))
    with open(ruta, 'wb') as f:
        f.write(png)
    return len(png)


def main():
    os.makedirs(DESTINO, exist_ok=True)
    for nombre, lado, maskable in (
        ('icon-180.png', 180, False),
        ('icon-192.png', 192, False),
        ('icon-512.png', 512, False),
        ('icon-maskable-512.png', 512, True),
    ):
        ruta = os.path.join(DESTINO, nombre)
        n = escribir_png(ruta, lado, construir(lado, maskable))
        print('%-24s %4d x %-4d %6d bytes' % (nombre, lado, lado, n))


if __name__ == '__main__':
    main()
