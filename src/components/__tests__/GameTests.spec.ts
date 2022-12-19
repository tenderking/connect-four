import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
// import HelloWorld from "../HelloWorld.vue";

// describe("HelloWorld", () => {
//   it("renders properly", () => {
//     const wrapper = mount(HelloWorld, { props: { msg: "Hello Vitest" } });
//     expect(wrapper.text()).toContain("Hello Vitest");
//   });
// });
describe("Connect Four", () => {
	let game;

	beforeEach(() => {
		game = new ConnectFour();
	});

	test("a new game should have no winner", () => {
		expect(game.getWinner()).toBeNull();
	});

	test("player 1 can make a move", () => {
		game.makeMove(0);
		expect(game.board[5][0]).toBe(1);
	});

	test("player 2 can make a move", () => {
		game.makeMove(0);
		game.makeMove(1);
		expect(game.board[5][1]).toBe(2);
	});

	test("player 1 cannot make a move in a full column", () => {
		for (let i = 0; i < 6; i++) {
			game.makeMove(0);
		}
		expect(() => game.makeMove(0)).toThrowError("Column is full");
	});

	test("game should end in a draw if board is full and no winner", () => {
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 6; j++) {
				game.makeMove(i);
			}
		}
		expect(game.getWinner()).toBe("draw");
	});

	test("game should end with a winner if four in a row", () => {
		for (let i = 0; i < 4; i++) {
			game.makeMove(i);
			game.makeMove(i);
		}
		expect(game.getWinner()).toBe(1);
	});

	test("players take turns correctly", () => {
		game.makeMove(0);
		expect(game.currentPlayer).toBe(2);
		game.makeMove(1);
		expect(game.currentPlayer).toBe(1);
	});

	test("game recognizes horizontal win", () => {
		for (let i = 0; i < 4; i++) {
			game.makeMove(i);
		}
		expect(game.getWinner()).toBe(1);
	});

	test("game recognizes vertical win", () => {
		for (let i = 0; i < 4; i++) {
			game.makeMove(0);
		}
		expect(game.getWinner()).toBe(1);
	});

	test("game recognizes diagonal win (top-left to bottom-right)", () => {
		game.makeMove(0);
		game.makeMove(1);
		game.makeMove(1);
		game.makeMove(2);
		game.makeMove(2);
		game.makeMove(2);
		game.makeMove(3);
		expect(game.getWinner()).toBe(1);
	});

	test("game recognizes diagonal win (top-right to bottom-left)", () => {
		game.makeMove(3);
		game.makeMove(2);
		game.makeMove(2);
		game.makeMove(1);
		game.makeMove(1);
		game.makeMove(1);
		game.makeMove(0);
		expect(game.getWinner()).toBe(1);
	});

	test("game recognizes horizontal win in bottom row", () => {
		for (let i = 0; i < 4; i++) {
			game.makeMove(i);
			game.makeMove(i);
		}
		expect(game.getWinner()).toBe(1);
	});

	test("game recognizes vertical win in rightmost column", () => {
		for (let i = 0; i < 4; i++) {
			game.makeMove(6);
			game.makeMove(6);
		}
		expect(game.getWinner()).toBe(1);
	});

	test("game recognizes diagonal win with top-left piece in bottom row (bottom-right to top-left)", () => {
		game.makeMove(3);
		game.makeMove(2);
		game.makeMove(2);
		game.makeMove(1);
		game.makeMove(1);
		game.makeMove(1);
		game.makeMove(0);
		expect(game.getWinner()).toBe(1);
	});
});
