#!/usr/bin/env python3
"""Create folder «клиенты», document «Formal», full TO BE sales process map."""
from __future__ import annotations

import json
import os
import secrets
import sqlite3
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.environ.get("MMTABLE_DB_PATH", os.path.join(ROOT, "workspace.db"))
EMAIL = "skitovich@yandex.ru"
FOLDER_NAME = "клиенты"
DOC_NAME = "Formal"

BP_STAGE_WIDTH = 140
BP_STAGE_HEIGHT = 46
BP_STAGE_GAP = 5
BP_BASE_PAD_X = 15
BP_BASE_PAD_Y = 15
BP_CHEVRON_INSET_PX = 14
BP_TASK_OFFSET_X = 24
BP_TASK_STAGE_GAP = 12
BP_TASK_GAP = 5
BP_TASK_RADIUS = 5
BP_BASE_FILL = "#ece8fd"
BP_TASK_FILL = "#fbcfe8"

MAIN_W = 108
MAIN_H = 44
MAIN_INSET = 9

GREY = "#d1d5db"
GREEN = "#86efac"
GREEN_D = "#22c55e"
PURPLE = "#c4b5fd"
BLUE = "#60a5fa"
RED = "#ef4444"
INPUT_FILL = "#dbeafe"


def px(value: float) -> str:
    return f"{int(round(value))}px"


def stage_stride(width: int, inset: int) -> int:
    return width - inset + BP_STAGE_GAP


def stages_span(count: int, width: int, inset: int) -> int:
    return width + max(0, count - 1) * stage_stride(width, inset)


@dataclass
class FormalLayoutBuilder:
    shapes: list[dict] = field(default_factory=list)
    connectors: list[dict] = field(default_factory=list)
    registry: dict[str, str] = field(default_factory=dict)
    shape_counter: int = 1
    conn_counter: int = 1
    group_counter: int = 1
    bp_counter: int = 1
    z_index: int = 11

    def next_shape_id(self) -> str:
        sid = f"shape_{self.shape_counter}"
        self.shape_counter += 1
        return sid

    def next_conn_id(self) -> str:
        cid = f"conn_{self.conn_counter}"
        self.conn_counter += 1
        return cid

    def next_group_id(self) -> str:
        gid = f"g{self.group_counter}"
        self.group_counter += 1
        return gid

    def next_bp_id(self) -> str:
        pid = f"bp{self.bp_counter}"
        self.bp_counter += 1
        return pid

    def bump_z(self) -> int:
        z = self.z_index
        self.z_index += 1
        return z

    def default_fields(self) -> dict:
        return {
            "numberGrouping": True,
            "numberFormat": "number",
            "decimalPlaces": None,
            "tableTitle": "",
            "tableHeaderFill": "",
            "tableHeaderFillEnabled": True,
            "tableHeaderGradientEnabled": False,
            "tableHeaderFill2": "#ffffff",
            "tableHeaderFillDirection": "horizontal",
            "tableHeaderTextStyle": {
                "color": "#334155",
                "baseFontSize": 18,
                "fontSize": 18,
                "bold": False,
                "italic": False,
                "strike": False,
                "wrap": False,
                "hAlign": "left",
                "vAlign": "top",
            },
            "scrollEnabled": False,
            "gradientEnabled": False,
            "fillDirection": "horizontal",
            "border": "transparent",
            "borderStyle": "solid",
            "radius": 0,
            "opacity": "1",
            "shadow": 0,
            "angle": 0,
            "flipX": False,
            "flipY": False,
            "bpTaskAutoHeight": True,
            "bpTaskManualPosition": False,
            "tableData": None,
        }

    def add_chevron(
        self,
        *,
        key: str | None,
        group_id: str,
        left: float,
        top: float,
        width: float,
        height: float,
        fill: str,
        text: str = "",
        text_color: str = "#111827",
        font_size: int = 13,
        bold: bool = False,
        inset: int = BP_CHEVRON_INSET_PX,
        bp_process_id: str | None = None,
        bp_role: str | None = None,
        bp_stage_index: int | None = None,
    ) -> str:
        sid = self.next_shape_id()
        shape = {
            "id": sid,
            "connId": sid,
            "groupId": group_id,
            "type": "shape-rect",
            "shapeVariant": "chevron",
            "shapeInsetDepthPx": inset,
            "left": px(left),
            "top": px(top),
            "width": px(width),
            "height": px(height),
            "zIndex": self.bump_z(),
            "text": text,
            "fillEnabled": True,
            "fill": fill,
            "fill2": fill,
            "borderEnabled": False,
            "borderWidth": 1,
            "textColor": text_color,
            "fontSize": font_size,
            "bold": bold,
            "hAlign": "center",
            "vAlign": "middle",
            **self.default_fields(),
        }
        if bp_process_id:
            shape["bpProcessId"] = bp_process_id
        if bp_role:
            shape["bpRole"] = bp_role
        if bp_stage_index is not None:
            shape["bpStageIndex"] = bp_stage_index
        self.shapes.append(shape)
        if key:
            self.registry[key] = sid
        return sid

    def add_task(
        self,
        *,
        group_id: str,
        left: float,
        top: float,
        width: float,
        title: str,
        bp_process_id: str,
        stage_index: int,
        order: int = 0,
        height: float = 36,
    ) -> str:
        sid = self.next_shape_id()
        self.shapes.append(
            {
                "id": sid,
                "connId": sid,
                "groupId": group_id,
                "type": "shape-note",
                "left": px(left),
                "top": px(top),
                "width": px(width),
                "height": px(height),
                "zIndex": self.bump_z(),
                "text": title,
                "fillEnabled": True,
                "fill": BP_TASK_FILL,
                "fill2": BP_TASK_FILL,
                "borderEnabled": False,
                "borderWidth": 1,
                "border": "rgb(17, 24, 39)",
                "radius": BP_TASK_RADIUS,
                "textColor": "",
                "fontSize": 12,
                "bold": False,
                "hAlign": "left",
                "vAlign": "top",
                "bpProcessId": bp_process_id,
                "bpRole": "task",
                "bpTaskStageIndex": stage_index,
                "bpTaskOrder": order,
                "bpTaskAutoHeight": True,
                "bpTaskManualPosition": False,
                "bpTaskData": {
                    "title": title,
                    "subtitle": "",
                    "expanded": False,
                    "description": "",
                    "assigner": "",
                    "executor": "",
                    "deadline": "",
                    "timeTracking": "",
                    "project": "",
                    "crmElements": "",
                    "conditions": "",
                    "tags": "",
                    "results": [""],
                    "additional": "",
                },
                **self.default_fields(),
            }
        )
        return sid

    def add_label(
        self,
        text: str,
        *,
        left: float,
        top: float,
        width: float,
        height: float = 32,
        color: str = "#dc2626",
        font_size: int = 15,
        bold: bool = True,
        h_align: str = "center",
        key: str | None = None,
    ) -> str:
        sid = self.next_shape_id()
        self.shapes.append(
            {
                "id": sid,
                "connId": sid,
                "type": "shape-rect",
                "shapeVariant": "rectangle",
                "left": px(left),
                "top": px(top),
                "width": px(width),
                "height": px(height),
                "zIndex": self.bump_z(),
                "text": text,
                "fillEnabled": False,
                "gradientEnabled": False,
                "fill": "#ffffff",
                "fill2": "#ffffff",
                "borderEnabled": False,
                "borderWidth": 0,
                "border": "transparent",
                "radius": 0,
                "textColor": color,
                "fontSize": font_size,
                "bold": bold,
                "hAlign": h_align,
                "vAlign": "middle",
                **self.default_fields(),
            }
        )
        if key:
            self.registry[key] = sid
        return sid

    def add_card(
        self,
        text: str,
        *,
        left: float,
        top: float,
        width: float = 110,
        height: float = 28,
    ) -> str:
        sid = self.next_shape_id()
        self.shapes.append(
            {
                "id": sid,
                "connId": sid,
                "type": "shape-rect",
                "shapeVariant": "rounded",
                "left": px(left),
                "top": px(top),
                "width": px(width),
                "height": px(height),
                "zIndex": self.bump_z(),
                "text": text,
                "fillEnabled": True,
                "fill": "#ffffff",
                "fill2": "#ffffff",
                "borderEnabled": True,
                "borderWidth": 1,
                "border": "#cbd5e1",
                "borderStyle": "solid",
                "radius": 8,
                "textColor": "#334155",
                "fontSize": 12,
                "bold": False,
                "hAlign": "center",
                "vAlign": "middle",
                **self.default_fields(),
            }
        )
        return sid

    def add_input_box(self, text: str, *, left: float, top: float, key: str | None = None) -> str:
        sid = self.next_shape_id()
        self.shapes.append(
            {
                "id": sid,
                "connId": sid,
                "type": "shape-rect",
                "shapeVariant": "rounded",
                "left": px(left),
                "top": px(top),
                "width": "210px",
                "height": "36px",
                "zIndex": self.bump_z(),
                "text": text,
                "fillEnabled": True,
                "fill": INPUT_FILL,
                "fill2": INPUT_FILL,
                "borderEnabled": True,
                "borderWidth": 1,
                "border": "#93c5fd",
                "borderStyle": "solid",
                "radius": 10,
                "textColor": "#1e3a8a",
                "fontSize": 12,
                "bold": False,
                "hAlign": "center",
                "vAlign": "middle",
                **self.default_fields(),
            }
        )
        if key:
            self.registry[key] = sid
        return sid

    def add_region_box(self, *, left: float, top: float, width: float, height: float) -> str:
        sid = self.next_shape_id()
        self.shapes.append(
            {
                "id": sid,
                "connId": sid,
                "type": "shape-rect",
                "shapeVariant": "rectangle",
                "left": px(left),
                "top": px(top),
                "width": px(width),
                "height": px(height),
                "zIndex": self.bump_z(),
                "text": "",
                "fillEnabled": False,
                "borderEnabled": True,
                "borderWidth": 2,
                "border": "#94a3b8",
                "borderStyle": "dashed",
                "radius": 12,
                **self.default_fields(),
            }
        )
        return sid

    def add_note(self, text: str, *, left: float, top: float, width: float = 180, font_size: int = 11) -> str:
        sid = self.next_shape_id()
        self.shapes.append(
            {
                "id": sid,
                "connId": sid,
                "type": "shape-note",
                "left": px(left),
                "top": px(top),
                "width": px(width),
                "height": "24px",
                "zIndex": self.bump_z(),
                "text": text,
                "fillEnabled": False,
                "borderEnabled": False,
                "textColor": "#64748b",
                "fontSize": font_size,
                "bold": False,
                "hAlign": "left",
                "vAlign": "top",
                **self.default_fields(),
            }
        )
        return sid

    def connect(
        self,
        from_key: str,
        to_key: str,
        *,
        from_anchor: str = "r",
        to_anchor: str = "l",
        dashed: bool = True,
        color: str = "#64748b",
    ) -> None:
        self.connectors.append(
            {
                "id": self.next_conn_id(),
                "zIndex": 1,
                "from": {"nodeId": self.registry[from_key], "anchor": from_anchor},
                "to": {"nodeId": self.registry[to_key], "anchor": to_anchor},
                "color": color,
                "width": 2,
                "lineStyle": "dashed" if dashed else "solid",
                "opacity": 1,
                "shadow": 0,
                "startArrowShape": "line",
                "endArrowShape": "classic",
                "routeStyle": "straight",
                "routePoints": [],
                "gapStart": 8,
                "gapEnd": 8,
            }
        )

    def build_bp(
        self,
        prefix: str,
        origin_x: float,
        origin_y: float,
        stages: list[tuple[str, str]],
        tasks: list[tuple[int, str, int]],
        label: str,
        *,
        stage_width: int = BP_STAGE_WIDTH,
        stage_height: int = BP_STAGE_HEIGHT,
        inset: int = BP_CHEVRON_INSET_PX,
        label_color: str = "#dc2626",
        label_width: float | None = None,
    ) -> tuple[float, float, float, float]:
        process_id = self.next_bp_id()
        group_id = self.next_group_id()
        count = len(stages)
        span = stages_span(count, stage_width, inset)
        base_w = span + BP_BASE_PAD_X * 2
        base_h = stage_height + BP_BASE_PAD_Y * 2
        stage_top = origin_y + BP_BASE_PAD_Y

        self.add_chevron(
            key=f"{prefix}_base",
            group_id=group_id,
            left=origin_x,
            top=origin_y,
            width=base_w,
            height=base_h,
            fill=BP_BASE_FILL,
            inset=inset,
            bp_process_id=process_id,
            bp_role="base",
        )

        stage_positions: list[tuple[float, float]] = []
        left = origin_x + BP_BASE_PAD_X
        for index, (text, color) in enumerate(stages):
            is_last = index == count - 1
            white_text = color in {GREEN_D, BLUE, RED} or (is_last and color != GREY)
            self.add_chevron(
                key=f"{prefix}_s{index}",
                group_id=group_id,
                left=left,
                top=stage_top,
                width=stage_width,
                height=stage_height,
                fill=color,
                text=text,
                text_color="#ffffff" if white_text else "#111827",
                font_size=12 if len(text) > 16 else 13,
                bold=is_last and white_text,
                inset=inset,
                bp_process_id=process_id,
                bp_role="stage",
                bp_stage_index=index,
            )
            stage_positions.append((left, stage_width))
            if index < count - 1:
                left += stage_stride(stage_width, inset)

        task_top = origin_y + base_h + BP_TASK_STAGE_GAP
        prev_right: float | None = None
        tasks_by_stage: dict[int, list[tuple[str, int]]] = {}
        for stage_index, title, order in tasks:
            tasks_by_stage.setdefault(stage_index, []).append((title, order))

        for stage_index in sorted(tasks_by_stage):
            stage_left, stage_w = stage_positions[stage_index]
            ideal = stage_left + BP_TASK_OFFSET_X
            task_left = ideal if prev_right is None else max(ideal, prev_right + BP_TASK_GAP)
            for order, (title, _) in enumerate(sorted(tasks_by_stage[stage_index], key=lambda x: x[1])):
                self.add_task(
                    group_id=group_id,
                    left=task_left,
                    top=task_top + order * 38,
                    width=stage_w,
                    title=title,
                    bp_process_id=process_id,
                    stage_index=stage_index,
                    order=order,
                    height=34,
                )
            prev_right = task_left + stage_w

        if label:
            lw = label_width or max(260, base_w * 0.55)
            label_left = origin_x + (base_w - lw) / 2
            label_top = task_top + 88
            self.add_label(label, left=label_left, top=label_top, width=lw, color=label_color)

        return origin_x, origin_y, base_w, base_h + 130


def build_formal_layout() -> dict:
    b = FormalLayoutBuilder()

    main_stages = [
        ("НОВЫЙ\nЗАПРОС", GREY),
        ("НОВАЯ\nЗАЯВКА", GREY),
        ("ТП\nГОТОВО", GREEN),
        ("СХЕМА\nСОГЛАСОВАНА", GREEN),
        ("ТКП\nОТПРАВЛЕНО", GREEN),
        ("ТП\nСОГЛАСОВАНО", GREEN),
        ("СКИДКА\nСОГЛАСОВАНА", GREEN),
        ("ТЕНДЕР\nВЫИГРАН", GREEN_D),
        ("СПЕЦИФИКАЦИЯ\nПОДПИСАНА", GREEN_D),
        ("ПОСТАВЩИК\nВЫБРАН", PURPLE),
        ("ЗАКАЗ\nРАЗМЕЩЁН", PURPLE),
        ("ЗАКАЗ\nПОЛУЧЕН", PURPLE),
        ("ЗАКАЗ\nОТГРУЖЕН", PURPLE),
        ("ЗАКАЗ\nОПЛАЧЕН", BLUE),
        ("СДЕЛКА\nУСПЕШНА", GREEN_D),
    ]
    main_tasks = [
        (1, "Описать запрос", 0),
        (1, "Рассчитать схему сделки\n(Ассистент)", 1),
        (1, "Посчитать вход ТАБЛИЦА\n(Ассистент)", 2),
        (2, "Оформить ТКП (Ассистент)", 0),
        (2, "Согласовать схему сделки", 1),
        (3, "Создать котировку\n(Тендерный)", 0),
        (3, "Отправить ТКП", 1),
        (4, "Согласовать ТП", 0),
        (5, "Согласовать скидку", 0),
        (6, "Выиграть тендер\n(Тендерный)", 0),
        (6, "Получить уведомление\nо выигрыше", 1),
        (7, "Подготовить спецификацию\n(тендерный)", 0),
        (7, "Подписать спецификацию\nс клиентом", 1),
        (8, "Выбрать поставщика", 0),
        (9, "Разместить заказ\nв закупку", 0),
        (10, "Провести испытания\n(производство)", 0),
        (10, "Получить заказ (склад)", 1),
        (11, "Отгрузить заказ (склад)", 0),
        (12, "Получить оплату\n(ассистент)", 0),
        (13, "Получить доки ЭДО\n(ассистент)", 0),
    ]

    main_x, main_y = 280, 620
    b.add_label(
        "TO BE : ПРОДАЖИ (95% тендерные процедуры)",
        left=main_x,
        top=main_y - 48,
        width=720,
        color="#111827",
        font_size=18,
    )

    b.add_input_box("1. От менеджера (новые)", left=40, top=main_y + 20, key="inp1")
    b.add_input_box("2. Из Тендерного (поиск)", left=40, top=main_y + 68, key="inp2")

    mx, my, mw, mh = b.build_bp(
        "main",
        main_x,
        main_y,
        main_stages,
        main_tasks,
        "",
        stage_width=MAIN_W,
        stage_height=MAIN_H,
        inset=MAIN_INSET,
    )

    lost_x = main_x + mw + 40
    b.add_chevron(
        key="main_lost",
        group_id=b.next_group_id(),
        left=lost_x,
        top=main_y,
        width=130,
        height=MAIN_H + BP_BASE_PAD_Y * 2,
        fill=RED,
        text="СДЕЛКА\nПРОИГРАНА",
        text_color="#ffffff",
        font_size=12,
        bold=True,
        inset=MAIN_INSET,
    )
    b.add_note("комментарий обязательно", left=lost_x, top=main_y + MAIN_H + BP_BASE_PAD_Y * 2 + 16, width=130)

    deal_x = main_x + BP_BASE_PAD_X + stage_stride(MAIN_W, MAIN_INSET)
    for i, name in enumerate(["Сделка 1", "Сделка 2", "Сделка 3"]):
        b.add_card(name, left=deal_x + i * 118, top=main_y + mh - 20, width=105, height=26)

    tender_x = main_x + stage_stride(MAIN_W, MAIN_INSET) * 2
    b.build_bp(
        "tender",
        tender_x,
        280,
        [
            ("НОВАЯ\nЗАЯВКА", GREY),
            ("КОТИРОВКА\nСОЗДАНА", GREEN),
            ("ТЕНДЕР\nВЫИГРАН", GREEN_D),
            ("СПЕЦИФИКАЦИЯ\nПОДПИСАНА", GREEN_D),
        ],
        [
            (0, "Создать котировку\n(Тендерный)", 0),
            (2, "Выиграть тендер\n(Тендерный)", 0),
            (3, "Подготовить спецификацию\n(Тендерный)", 0),
        ],
        "ТЕНДЕРНЫЙ ОТДЕЛ (смарт)",
    )

    eng_x, eng_y = 120, 980
    b.add_region_box(left=eng_x - 20, top=eng_y - 20, width=980, height=260)
    b.build_bp(
        "eng",
        eng_x,
        eng_y,
        [
            ("НОВАЯ\nЗАЯВКА", GREY),
            ("ТП\nПОДГОТОВЛЕНО", GREEN),
            ("РЕШЕНИЕ\nВЫБРАНО", GREEN_D),
            ("ТП\nСОГЛАСОВАНО", GREEN),
            ("ТЕНДЕР\nВЫИГРАН", GREEN_D),
            ("ПОСТАВЩИК\nВЫБРАН", GREEN_D),
        ],
        [
            (0, "Получить предложения\nпоставщиков", 0),
            (0, "Получить стоимость\nдоставки и таможни (ВЭД)", 1),
            (1, "Подготовить ТП", 0),
            (2, "Выбрать решение\n(менеджер)", 0),
            (3, "Подтвердить инфо\nдля ТКП", 0),
            (4, "Выиграть тендер\n(дождаться)", 0),
            (5, "Выбрать решение\nпоставки (2 Спец)", 0),
        ],
        "ИНЖЕНЕРНАЯ ПОДГОТОВКА (смарт)",
        label_width=420,
    )
    for i, name in enumerate(["Подбор 1", "Подбор 2", "Подбор 3"]):
        b.add_card(name, left=eng_x + BP_BASE_PAD_X + i * 118, top=eng_y + 200, width=105, height=26)

    proc_x, proc_y = 1180, 980
    b.add_region_box(left=proc_x - 20, top=proc_y - 20, width=980, height=260)
    b.build_bp(
        "proc",
        proc_x,
        proc_y,
        [
            ("НОВАЯ\nЗАКУПКА", GREY),
            ("ЗАКАЗ\nРАЗМЕЩЁН", PURPLE),
            ("ЗАКАЗ\nПРОВЕРЕН", PURPLE),
            ("ЗАКАЗ\nВ ПУТИ", PURPLE),
            ("ЗАКАЗ\nРАСТАМОЖЕН", PURPLE),
            ("ЗАКАЗ\nПОЛУЧЕН", GREEN_D),
        ],
        [
            (0, "Разместить заказ -\nподготовить документы (ВЭД)", 0),
            (1, "Проверить до отгрузки\n(Инженер)", 0),
            (2, "Проверить готовность\nзаказа (ВЭД)", 0),
            (3, "Передать заказ\nперевозчику (ВЭД)", 0),
            (4, "Растаможить заказ (ВЭД)", 0),
            (5, "Получить заказ\nна склад (ВЭД)", 0),
        ],
        "ЗАКУПКИ (смарт)",
        label_width=260,
    )
    for i, name in enumerate(["Закупка 1", "Закупка 2", "Закупка 3"]):
        b.add_card(name, left=proc_x + BP_BASE_PAD_X + i * 118, top=proc_y + 200, width=105, height=26)

    prod_x = main_x + stage_stride(MAIN_W, MAIN_INSET) * 9
    b.build_bp(
        "prod",
        prod_x,
        980,
        [
            ("НОВАЯ\nЗАЯВКА", GREY),
            ("ИСПЫТАНИЯ", GREEN),
            ("МАРКИРОВКА", GREEN),
            ("ТК", GREEN),
            ("ОТГРУЖЕН", GREEN_D),
        ],
        [],
        "ПРОИЗВОДСТВО (смарт)",
        label_width=280,
    )

    b.build_bp(
        "tp",
        120,
        1320,
        [
            ("НОВЫЙ\nЗАПРОС", GREY),
            ("ЗАПРОС\nОТПРАВЛЕН", GREEN),
            ("ТКП\nПОЛУЧЕНО", GREEN),
            ("ТКП\nОБРАБОТАН", GREEN_D),
        ],
        [],
        "ПОДБОР ТП (смарт)",
        label_width=260,
    )
    b.add_card("Запрос поставщику 1", left=150, top=1480, width=130)
    b.add_card("Запрос поставщику 2", left=290, top=1480, width=130)

    b.connect("inp1", "main_s0", from_anchor="r", to_anchor="l", dashed=False)
    b.connect("inp2", "main_s0", from_anchor="r", to_anchor="l", dashed=False)
    b.connect("main_s3", "tender_s0", from_anchor="t", to_anchor="b")
    b.connect("tender_s1", "main_s6", from_anchor="b", to_anchor="t")
    b.connect("tender_s3", "main_s8", from_anchor="b", to_anchor="t")
    b.connect("main_s1", "eng_s0", from_anchor="b", to_anchor="t")
    b.connect("eng_s1", "main_s2", from_anchor="t", to_anchor="b")
    b.connect("eng_s2", "main_s4", from_anchor="t", to_anchor="b")
    b.connect("eng_s5", "main_s9", from_anchor="t", to_anchor="b")
    b.connect("main_s9", "proc_s0", from_anchor="b", to_anchor="t")
    b.connect("proc_s1", "main_s10", from_anchor="t", to_anchor="b")
    b.connect("proc_s5", "main_s11", from_anchor="t", to_anchor="b")
    b.connect("main_s10", "prod_s0", from_anchor="b", to_anchor="t")
    b.connect("prod_s4", "main_s12", from_anchor="t", to_anchor="b")

    b.add_note("создание", left=tender_x + 40, top=520, width=80)
    b.add_note("проброс данных", left=eng_x + 300, top=900, width=120)
    b.add_note("команда на перемещение\nсделки + проброс данных", left=proc_x + 200, top=900, width=200)

    return {
        "schemaVersion": 3,
        "activeSheetId": 1,
        "sheets": [
            {
                "id": 1,
                "name": "Лист 1",
                "layout": {
                    "schemaVersion": 2,
                    "zoom": 0.45,
                    "zCounter": b.z_index,
                    "windowCounter": 1,
                    "shapeCounter": b.shape_counter,
                    "groupCounter": b.group_counter,
                    "bpProcessCounter": b.bp_counter,
                    "desktopStyle": {
                        "fillEnabled": False,
                        "gradientEnabled": False,
                        "fill": "#f6f8fc",
                        "fill2": "#eef3ff",
                        "fillDirection": "diagonal",
                        "borderEnabled": False,
                        "border": "#d8e2f0",
                        "gridSize": 24,
                        "opacity": 100,
                    },
                    "windows": [],
                    "shapes": b.shapes,
                    "connectors": b.connectors,
                },
            }
        ],
    }


def new_folder_id(conn: sqlite3.Connection) -> str:
    while True:
        folder_id = secrets.token_hex(6)
        if not conn.execute("SELECT 1 FROM user_folders WHERE id = ?", (folder_id,)).fetchone():
            return folder_id


def new_doc_id(conn: sqlite3.Connection) -> str:
    while True:
        doc_id = secrets.token_hex(6)
        if not conn.execute("SELECT 1 FROM user_documents WHERE id = ?", (doc_id,)).fetchone():
            return doc_id


def ensure_schema(conn: sqlite3.Connection) -> None:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS user_folders (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          name TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    cols = {row[1] for row in conn.execute("PRAGMA table_info(user_documents)").fetchall()}
    if "folder_id" not in cols:
        conn.execute("ALTER TABLE user_documents ADD COLUMN folder_id TEXT")
    conn.commit()


def main() -> int:
    email = EMAIL.lower()
    layout = build_formal_layout()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        ensure_schema(conn)
        folder_row = conn.execute(
            "SELECT id FROM user_folders WHERE lower(email) = ? AND name = ?",
            (email, FOLDER_NAME),
        ).fetchone()
        if folder_row:
            folder_id = folder_row["id"]
            print(f"Folder already exists: {FOLDER_NAME} ({folder_id})")
        else:
            folder_id = new_folder_id(conn)
            sort_order = conn.execute(
                "SELECT COALESCE(MAX(sort_order), -1) + 1 FROM user_folders WHERE lower(email) = ?",
                (email,),
            ).fetchone()[0]
            conn.execute(
                """
                INSERT INTO user_folders(id, email, name, sort_order, created_at, updated_at)
                VALUES(?, ?, ?, ?, ?, ?)
                """,
                (folder_id, email, FOLDER_NAME, sort_order, now, now),
            )
            print(f"Created folder: {FOLDER_NAME} ({folder_id})")

        doc_row = conn.execute(
            "SELECT id FROM user_documents WHERE lower(email) = ? AND name = ? AND folder_id = ?",
            (email, DOC_NAME, folder_id),
        ).fetchone()
        if doc_row:
            doc_id = doc_row["id"]
            conn.execute(
                """
                UPDATE user_documents
                SET layout_json = ?, updated_at = ?
                WHERE id = ?
                """,
                (json.dumps(layout, ensure_ascii=False), now, doc_id),
            )
            print(f"Updated document: {DOC_NAME} ({doc_id})")
        else:
            doc_id = new_doc_id(conn)
            conn.execute(
                """
                INSERT INTO user_documents(id, email, name, layout_json, is_active, folder_id, created_at, updated_at)
                VALUES(?, ?, ?, ?, 0, ?, ?, ?)
                """,
                (doc_id, email, DOC_NAME, json.dumps(layout, ensure_ascii=False), folder_id, now, now),
            )
            conn.execute(
                "INSERT OR IGNORE INTO document_access(document_id, user_email, role) VALUES(?, ?, ?)",
                (doc_id, email, "owner"),
            )
            print(f"Created document: {DOC_NAME} ({doc_id})")

        conn.commit()
        shapes = layout["sheets"][0]["layout"]["shapes"]
        conns = layout["sheets"][0]["layout"]["connectors"]
        print(f"Layout: {len(shapes)} shapes, {len(conns)} connectors")
        print(f"Done. Open /d/{doc_id}/1 after login as {email}")
        return 0
    finally:
        conn.close()


if __name__ == "__main__":
    sys.exit(main())