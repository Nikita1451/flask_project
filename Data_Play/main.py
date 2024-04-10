import time
from pygame import font
import pygame
import sys

pygame.font.init()
timer = pygame.time.Clock()
IM_coef = float(input("Коэффициэнт изображений(базовый - 1)"))
SCREEN_WIDTH = int(input())
SCREEN_HEIGHT = int(input())
fonts = pygame.font.Font("resource/cheri.ttf", 30)
text = fonts.render("Так держать! Сейчас - спресуем в готовый продукт и готово!", True, (255, 255, 255))
text_rect = text.get_rect()
text_rect.center = (SCREEN_WIDTH // 2, 100)
text_play = pygame.font.Font("resource/cheri.ttf", 50)
text_play_rect = text_play.render("Приложите карту...", True, (255, 255, 255))
text_r = text_play_rect.get_rect()
text_r.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
from classes import Litties, conteiner
pause = False
past_uic = []

while True:
    player_sprites = pygame.sprite.Group()
    manipulator = Litties()
    cont = conteiner()
    player_sprites.add(player_sprites)
    pause = False

    while True:
        screen.fill((0,0,0))
        with open('uic.txt', 'r') as file:
            if not 'None' in file.read() and not file.read() in past_uic:
                past_uic.append(file.read())
                break
        screen.blit(text_play_rect, text_r)
        pygame.display.flip()

    while True:
        block = pygame.transform.scale(pygame.image.load("resource/blocks.png"), (SCREEN_WIDTH, SCREEN_HEIGHT // 3 * 2))
        fon = pygame.transform.scale(pygame.image.load("resource/fon.png"), (SCREEN_WIDTH, SCREEN_HEIGHT))
        screen.blit(fon, (0, 0))
        screen.blit(block, (0, SCREEN_HEIGHT // 3 * 2.1))
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
        key = pygame.key.get_pressed()
        if key[pygame.K_LEFT]:
            manipulator.update_position(1)
        elif key[pygame.K_RIGHT]:
            manipulator.update_position(2)
        if key[pygame.K_UP]:
            manipulator.update_position(3)
        elif key[pygame.K_DOWN]:
            manipulator.update_position(4)
        if key[pygame.K_SPACE]:
            manipulator.findow = True
        if manipulator.findow:
            print("True")
            manipulator.anim_lit(cont)
        cont.draw(screen)
        manipulator.draw(screen)
        pygame.display.flip()
        if manipulator.findow:
            timer.tick(1)
        if cont.fl_activ or pause:
            print("Text")
            screen.blit(text, text_rect)
            pygame.display.flip()
            pause = True
            time.sleep(10)
            break
        timer.tick(15)
