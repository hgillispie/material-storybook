import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import ChartWrapper from "../src/components/ChartWrapper";
import { useChartResize } from "../src/hooks/useChartResize";

// Test component that triggers ResizeObserver
const ResizeObserverTestComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      // This might trigger the ResizeObserver loop error
      for (const entry of entries) {
        console.log("ResizeObserver triggered:", entry.contentRect);
        setCount((prev) => prev + 1);
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const triggerResize = () => {
    setDimensions((prev) => ({
      width: prev.width + 50,
      height: prev.height + 30,
    }));
  };

  const resetSize = () => {
    setDimensions({ width: 300, height: 200 });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        ResizeObserver Test Component
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        This component uses ResizeObserver and should not show any console
        errors. Resize count: {count}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={triggerResize} sx={{ mr: 1 }}>
          Increase Size
        </Button>
        <Button variant="outlined" onClick={resetSize}>
          Reset Size
        </Button>
      </Box>

      <Paper
        ref={containerRef}
        sx={{
          width: dimensions.width,
          height: dimensions.height,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
      >
        <Typography>
          {dimensions.width} × {dimensions.height}
        </Typography>
      </Paper>
    </Box>
  );
};

// Test component using the ChartWrapper
const ChartWrapperTestComponent: React.FC = () => {
  const [containerSize, setContainerSize] = useState({
    width: 400,
    height: 300,
  });

  const changeSize = () => {
    setContainerSize({
      width: Math.floor(Math.random() * 400) + 200,
      height: Math.floor(Math.random() * 300) + 150,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        ChartWrapper Test Component
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        This tests the ChartWrapper component with ResizeObserver.
      </Typography>

      <Button variant="contained" onClick={changeSize} sx={{ mb: 2 }}>
        Change Container Size
      </Button>

      <Box
        sx={{
          width: containerSize.width,
          height: containerSize.height,
          border: "2px dashed #ccc",
          transition: "all 0.3s ease",
        }}
      >
        <ChartWrapper height="100%" width="100%">
          <Box
            sx={{
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Simulated Chart</Typography>
            <Typography variant="body2">
              Size: {containerSize.width} × {containerSize.height}
            </Typography>
          </Box>
        </ChartWrapper>
      </Box>
    </Box>
  );
};

// Test component using the useChartResize hook
const UseChartResizeTestComponent: React.FC = () => {
  const { isReady, containerRef, dimensions, retryCount } = useChartResize({
    delay: 100,
    retryAttempts: 3,
    minWidth: 50,
    minHeight: 50,
  });

  const [containerWidth, setContainerWidth] = useState(300);

  const changeWidth = () => {
    setContainerWidth((prev) => (prev === 300 ? 500 : 300));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        useChartResize Hook Test
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Ready: {isReady ? "Yes" : "No"} | Retry Count: {retryCount} |
        Dimensions: {dimensions.width} × {dimensions.height}
      </Typography>

      <Button variant="contained" onClick={changeWidth} sx={{ mb: 2 }}>
        Toggle Width ({containerWidth}px)
      </Button>

      <Box
        ref={containerRef}
        sx={{
          width: containerWidth,
          height: 200,
          border: "2px solid #1976d2",
          transition: "width 0.3s ease",
          bgcolor: isReady ? "success.light" : "warning.light",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>{isReady ? "Chart Ready!" : "Initializing..."}</Typography>
      </Box>
    </Box>
  );
};

// Multiple components test
const MultipleResizeObserversTest: React.FC = () => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Multiple ResizeObserver Components Test
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          This story tests multiple components using ResizeObserver
          simultaneously. Check the browser console - there should be no
          ResizeObserver errors.
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ResizeObserverTestComponent />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ChartWrapperTestComponent />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <UseChartResizeTestComponent />
        </Paper>
      </Grid>
    </Grid>
  );
};

const meta: Meta<typeof ResizeObserverTestComponent> = {
  title: "Tests/ResizeObserver Fix",
  component: ResizeObserverTestComponent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## ResizeObserver Error Fix Test Stories

These stories are designed to test and verify that the ResizeObserver error fix is working correctly.

### What to Test:

1. **Basic ResizeObserver**: Tests direct ResizeObserver usage
2. **ChartWrapper**: Tests the ChartWrapper component
3. **useChartResize Hook**: Tests the custom hook
4. **Multiple Components**: Tests multiple ResizeObserver instances

### How to Verify:

1. Open your browser's developer console (F12)
2. Interact with the test components (click buttons, resize containers)
3. Verify that no "ResizeObserver loop completed with undelivered notifications" errors appear
4. Check that only debug messages are shown (if any)

### Expected Behavior:

- No error messages in console
- Components should resize smoothly
- All functionality should work as expected
- Debug messages may appear but no actual errors
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicResizeObserver: Story = {
  render: () => <ResizeObserverTestComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Tests basic ResizeObserver functionality. Click "Increase Size" multiple times and check console for errors.',
      },
    },
  },
};

export const ChartWrapperTest: Story = {
  render: () => <ChartWrapperTestComponent />,
  parameters: {
    docs: {
      description: {
        story:
          "Tests the ChartWrapper component which uses ResizeObserver internally.",
      },
    },
  },
};

export const UseChartResizeTest: Story = {
  render: () => <UseChartResizeTestComponent />,
  parameters: {
    docs: {
      description: {
        story:
          "Tests the useChartResize hook which provides ResizeObserver functionality.",
      },
    },
  },
};

export const MultipleComponents: Story = {
  render: () => <MultipleResizeObserversTest />,
  parameters: {
    docs: {
      description: {
        story:
          "Tests multiple components using ResizeObserver simultaneously to verify no conflicts or errors occur.",
      },
    },
  },
};

export const StressTest: Story = {
  render: () => {
    const StressTestComponent = () => {
      const [count, setCount] = useState(0);

      const createMultipleObservers = () => {
        // Create multiple observers rapidly to stress test
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            const div = document.createElement("div");
            div.style.width = "100px";
            div.style.height = "100px";
            document.body.appendChild(div);

            const observer = new ResizeObserver(() => {
              setCount((prev) => prev + 1);
            });

            observer.observe(div);

            // Remove after short time
            setTimeout(() => {
              observer.disconnect();
              document.body.removeChild(div);
            }, 1000);
          }, i * 100);
        }
      };

      return (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            ResizeObserver Stress Test
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Observer triggers: {count}
          </Typography>
          <Button variant="contained" onClick={createMultipleObservers}>
            Create 10 Rapid Observers
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 2 }}>
            This creates multiple ResizeObserver instances rapidly to test error
            handling.
          </Typography>
        </Box>
      );
    };

    return <StressTestComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stress test that creates multiple ResizeObserver instances rapidly to test the error suppression under load.",
      },
    },
  },
};
