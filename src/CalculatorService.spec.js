import { create } from "./CalculatorService";

console.log = () => {};

describe("with calculator container instance", () => {
  let instance;
  let executeAction;
  let newState;

  beforeEach(() => {
    instance = create();
    executeAction = action => {
      newState = instance.executeAction(action);
    };
  });

  it("should have a default value set to 0", () => {
    expect(instance.initialState.content).toEqual("0");
  });

  describe("with a number typed", () => {
    beforeEach(() => {
      executeAction("2");
    });

    it("should display the number", () => {
      expect(newState).toMatchObject({
        content: "2"
      });
    });

    describe("works for additions", () => {
      describe("with the + operation selected", () => {
        beforeEach(() => {
          executeAction("+");
        });

        describe("and another number typed", () => {
          beforeEach(() => {
            executeAction("3");
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should add the numbers", () => {
              expect(newState).toMatchObject({
                content: "5"
              });
            });
          });
        });
      });
    });

    describe("works for multiplications", () => {
      describe("with the * operation selected", () => {
        beforeEach(() => {
          executeAction("*");
        });

        describe("and another number typed", () => {
          beforeEach(() => {
            executeAction("3");
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should multiply the numbers", () => {
              expect(newState).toMatchObject({
                content: "6"
              });
            });
          });
        });
      });
    });

    describe("works for subtractions", () => {
      describe("with the - operation selected", () => {
        beforeEach(() => {
          executeAction("-");
        });

        describe("and another number typed", () => {
          beforeEach(() => {
            executeAction("1");
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should subtract the numbers", () => {
              expect(newState).toMatchObject({
                content: "1"
              });
            });
          });
        });
      });
    });

    describe("works for negative numbers", () => {
      describe("with the - operation selected", () => {
        beforeEach(() => {
          executeAction("-");
        });

        describe("and another number typed", () => {
          beforeEach(() => {
            executeAction("4");
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should subtract the numbers", () => {
              expect(newState).toMatchObject({
                content: "-2"
              });
            });
          });
        });
      });
    });

    describe("works for division", () => {
      describe("with the / operation selected", () => {
        beforeEach(() => {
          executeAction("/");
        });

        describe("and 0 typed", () => {
          beforeEach(() => {
            executeAction("0");
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should display an invalid result", () => {
              expect(newState).toMatchObject({
                content: "Invalid"
              });
            });
          });
        });

        describe("and 2 typed", () => {
          beforeEach(() => {
            executeAction("2");
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should divide the numbers", () => {
              expect(newState).toMatchObject({
                content: "1"
              });
            });
          });
        });
      });
    });
  });

  describe("works for large numbers", () => {
    describe("with a large number selected", () => {
      beforeEach(() => {
        new Array(12).fill(null).forEach(() => {
          executeAction("9");
        });
      });

      describe("with the * operation selected", () => {
        beforeEach(() => {
          executeAction("*");
        });

        describe("and another large number selected", () => {
          beforeEach(() => {
            new Array(12).fill(null).forEach(() => {
              executeAction("9");
            });
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should display a valid result", () => {
              expect(newState).toMatchObject({
                content: "9.99999999998000000000001e+23"
              });
            });
          });
        });
      });
    });
  });

  describe("works for decimal numbers", () => {
    describe("with a large number selected", () => {
      beforeEach(() => {
        executeAction("1");
        executeAction(".");
        executeAction("2");
        executeAction("2");
      });

      describe("with the + operation selected", () => {
        beforeEach(() => {
          executeAction("+");
        });

        describe("and another large number selected", () => {
          beforeEach(() => {
            executeAction("2");
          });

          describe("when query the result", () => {
            beforeEach(() => {
              executeAction("=");
            });

            it("should display a valid result", () => {
              expect(newState).toMatchObject({
                content: "3.22"
              });
            });
          });
        });
      });
    });
  });

  describe("handles division when the total is already invalid", () => {
    describe("with an invalid state", () => {
      beforeEach(() => {
        executeAction("0");
        executeAction("/");
        executeAction("0");
        executeAction("=");
      });

      it("should display an invalid result", () => {
        expect(newState).toMatchObject({
          content: "Invalid"
        });
      });

      describe("with another division by 0", () => {
        beforeEach(() => {
          executeAction("/");
          executeAction("0");
        });

        describe("when query the result", () => {
          beforeEach(() => {
            executeAction("=");
          });

          it("should display an invalid result", () => {
            expect(newState).toMatchObject({
              content: "Invalid"
            });
          });
        });
      });
    });
  });

  describe("computes automatically when an operator is hit and the information collected is enough", () => {
    describe("with operation and operators selected", () => {
      beforeEach(() => {
        executeAction("6");
        executeAction("/");
        executeAction("2");
      });

      describe("when doing another operation", () => {
        beforeEach(() => {
          executeAction("*");
        });

        it("should have computed the result", () => {
          expect(newState).toMatchObject({
            content: "3"
          });
        });
      });
    });
  });

  describe("allows to reset the calculator", () => {
    describe("with operation and operators selected", () => {
      beforeEach(() => {
        executeAction("6");
        executeAction("/");
        executeAction("2");
      });

      it("should display 2", () => {
        expect(newState).toMatchObject({
          content: "2"
        });
      });

      describe("when selecting the reset action (AC)", () => {
        beforeEach(() => {
          executeAction("AC");
        });

        it("should reset to 0", () => {
          expect(newState).toMatchObject({
            content: "0"
          });
        });
      });
    });
  });

  describe("with an invalid action", () => {
    let action;

    beforeEach(() => {
      action = "invalid";
    });

    it("should throw an exception", () => {
      expect(() => executeAction(action)).toThrow();
    });
  });
});
